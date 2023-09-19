"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('isAdmin', sa.Boolean(), nullable=False),
        sa.Column('firstName', sa.String(length=40), nullable=False),
        sa.Column('lastName', sa.String(length=40), nullable=False),
        sa.Column('username', sa.String(length=80), unique=True, nullable=False),
        sa.Column('email', sa.String(length=120), unique=True, nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('orders',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('userId', sa.Integer(), nullable=False),
        sa.Column('drinkId', sa.Integer(), nullable=False),
        sa.Column('createdAt', sa.DateTime, server_default=sa.func.now()),
        sa.Column('updatedAt', sa.DateTime, server_default=sa.func.now(), server_onupdate=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('reviews',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('userId', sa.Integer(), nullable=False),
        sa.Column('orderId', sa.Integer(), unique=True, nullable=False),
        sa.Column('review', sa.String(length=255), nullable=False),
        sa.Column('stars', sa.Integer(), nullable=False),
        sa.Column('createdAt', sa.DateTime(), server_default=sa.func.current_timestamp(), nullable=False),
        sa.Column('updatedAt', sa.DateTime(), server_default=sa.func.current_timestamp(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('toppings',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('name', sa.String(length=255), unique=True, nullable=False),
        sa.Column('details', sa.String(length=255), nullable=False),
        sa.Column('imageUrl', sa.String(length=255), nullable=False),
        sa.Column('inStock', sa.Boolean(), nullable=False),
        sa.Column('createdAt', sa.DateTime, server_default=sa.func.now()),
        sa.Column('updatedAt', sa.DateTime, server_default=sa.func.now(), server_onupdate=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('drinks',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('details', sa.String(length=255), nullable=False),
        sa.Column('imageUrl', sa.String(length=255), nullable=False),
        sa.Column('inStock', sa.Boolean(), nullable=False),
        sa.Column('createdAt', sa.DateTime, server_default=sa.func.now()),
        sa.Column('updatedAt', sa.DateTime, server_default=sa.func.now(), server_onupdate=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('order_toppings',
        sa.Column("orderId", sa.Integer(), primary_key=True),
        sa.Column("toppingId", sa.Integer(), primary_key=True),
        sa.ForeignKeyConstraint(["orderId"], ['orders.id']),
        sa.ForeignKeyConstraint(["toppingId"], ['toppings.id'])
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE orders SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE toppings SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE drinks SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE order_toppings SET SCHEMA {SCHEMA};")


def downgrade() -> None:
    op.drop_table('users', 'orders', 'reviews', 'toppings', 'drinks', 'order_toppings')
