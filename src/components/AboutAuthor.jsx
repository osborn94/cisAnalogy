import { SITE } from "../data/config";

export default function AboutAuthor() {
  const { name, bio, photo } = SITE.author;

  return (
    <section id="author" className="about">
      <div className="wrap author-wrap">
        {photo && (
          <img className="author-photo" src={photo} alt={name} />
        )}
        <div>
          <p className="eyebrow">About the Author</p>
          <h2 className="section-title">{name}</h2>
          <p>{bio}</p>
        </div>
      </div>
    </section>
  );
}