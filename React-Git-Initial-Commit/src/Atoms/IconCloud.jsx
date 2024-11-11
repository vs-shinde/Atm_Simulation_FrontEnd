import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Styles/IconCloud.css'; // Custom CSS for positioning icons

const slugs = [
  "fa-js", "fa-java", "fa-react", "fa-angular", "fa-node-js", "fa-html5", "fa-css3-alt",
  "fa-aws", "fa-docker", "fa-github", "fa-gitlab", "fa-bitbucket", "fa-figma",
];

const IconCloud = () => {
  return (
    <div className="icon-cloud">
      {slugs.map((icon, index) => (
        <i key={index} className={`fab ${icon}`} />
      ))}
    </div>
  );
};

export default IconCloud;
