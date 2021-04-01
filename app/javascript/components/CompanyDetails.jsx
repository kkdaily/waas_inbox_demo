import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function CompanyDetails({ name, logo_url, website_url, batch, size, location, industry }) {
  return (
    <div className="CompanyDetails mb-5">
      {/* Back button (appears only on small screens) */}
      <Nav className="back-btn d-lg-none">
        <Nav.Item>
          <Nav.Link>
            <Link to="/conversations">
              <i className="fas fa-arrow-left"></i>
              <span className="link-text ml-2">Back to inbox</span>
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Company logo and name */}
      <img src={logo_url} className="rounded mx-auto d-block mt-5" width="70" alt="company logo" />
      <h5 className="company-name text-center mt-3">
        <a className="website-url" target="_blank" rel="noreferrer" href={website_url}>
          <span>{name}</span>
          {batch && (
            <span className="text-muted">
              <span className="pl-1">({batch})</span>
            </span>
          )}
        </a>
      </h5>

      {/* Company tags */}
      <div className="tags text-center">
        <span className="badge mr-2 mt-2">
          <i className="fas fa-users"></i>
          <span className="pl-2 font-weight-normal">{size} People</span>
        </span>
        <span className="badge mr-2 mt-2">
          <i className="fas fa-map-marker-alt"></i>
          <span className="pl-2 font-weight-normal">{location}</span>
        </span>
        <span className="badge mr-2 mt-2">
          <i className="fas fa-tags"></i>
          <span className="pl-2 font-weight-normal">{industry}</span>
        </span>
      </div>
    </div>
  );
};

export default CompanyDetails;