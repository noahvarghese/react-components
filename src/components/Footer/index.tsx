import React from "react";
import "./index.scss";

export interface FooterProps {
    copyright: string;
    socialMedia?: { url: string; image: string; name: string }[];
    quote?: string;
}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <footer className="Footer footer-container">
            {props.socialMedia && (
                <div className="footer-social-media">
                    {props.socialMedia.map(({ url, image, name }) => (
                        <a
                            className="footer-social-media-image-container"
                            href={url}
                        >
                            <img src={image} alt={name} />{" "}
                        </a>
                    ))}
                </div>
            )}
            {props.quote && <p className="quote">{props.quote}</p>}
            <div className="copyright">&#169;{props.copyright}</div>
        </footer>
    );
};

export default Footer;
