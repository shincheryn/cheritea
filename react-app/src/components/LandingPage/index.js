import React from "react";
import { Link } from "react-router-dom";
import LandingPageImage from "./LandingPageImage.jpg";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="header">
        <h1 className="headline">Cheritea</h1>
        <p className="subheadline">
          Welcome to Cheritea, where we cherish our boba communitea 🧋 <br />
          Explore our delightful selection of unique milk tea flavors and
          toppings.
        </p>
        <Link to="/drinks" className="cta-button">
          view our drinks
        </Link>
      </div>

      <div className="image-container">
        <img
          src={LandingPageImage}
          alt="Landing Page"
          className="landing-image"
        />
      </div>

      <h1 className="headline">Our Story</h1>
      <div className="our-story">
        <p>
          At Cheritea, our journey began with a deep passion for creating an
          exceptional boba experience, one that would captivate the senses and
          bring a little piece of home to our beloved customers. Our story is a
          tale of dedication, love, and an unwavering commitment to the art of
          crafting the perfect bubble tea.{" "}
        </p>
        <p>
          It all started with a dream to introduce people to the enchanting
          world of boba and share the magic that happens when premium
          ingredients and creativity collide. We knew that to stand out in the
          bustling world of bubble tea, we needed to bring something truly
          special to the table.
        </p>
        <p>
          Our first and foremost commitment was to source only the finest
          ingredients. From the teas we use as the base for our drinks to the
          tapioca pearls that bring that delightful chewy texture, we
          painstakingly selected every element to ensure it met our high
          standards.
        </p>
        <p>
          Quality isn't just a buzzword at Cheritea; it's the cornerstone of our
          brand. In our quest to deliver a truly unique boba experience, we
          explored innovative and creative twists on traditional Asian flavors.
          Each recipe was meticulously crafted to strike the perfect balance of
          taste, texture, and aroma.
        </p>
        <p>
          We're passionate about our flavors and continue to experiment with new
          and exciting combinations that our customers can't resist. But it's
          not just about what goes into our drinks; it's about the care and love
          that goes into crafting each one. Every beverage prepared at Cheritea
          is a labor of love.
        </p>
        <p>
          Our dedicated team members take pride in ensuring that each drink is a
          work of art, from the precise brewing of the tea to the gentle
          blending of ingredients and the meticulous sealing of the cup.
        </p>
        <p>
          Our customers are at the heart of everything we do. We cherish the
          smiles, the shared moments, and the pure joy that our boba brings to
          people's lives.
        </p>
        <p>
          Cheritea is more than just a place to enjoy a drink; it's a place to
          create memories, to connect, and to savor the simple pleasures in
          life. As we continue to grow and evolve, we remain dedicated to
          providing you with the best boba experience.
        </p>
        <p>
          Our story is an ongoing one, driven by a relentless pursuit of
          excellence and a deep-seated commitment to our cherished customers. We
          invite you to join us on this journey, to sip, savor, and share in the
          magic of Cheritea, where every cup is crafted with love and care.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
