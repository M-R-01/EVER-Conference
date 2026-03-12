import styles from "./SpeakerCard.module.css";

export default function SpeakerCard({
  image,
  name,
  title,
  organization,
  talk,
  keynote,
  profileLink
}) {
  return (
    <div className={styles.card}>

      {keynote && <span className={styles.badge}>Keynote</span>}

      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
      </div>

      <div className={styles.content}>

        <h3 className={styles.name}>{name}</h3>

        <p className={styles.title}>{title}</p>

        <p className={styles.org}>{organization}</p>

        {talk && (
          <div className={styles.talkBox}>
            <p className={styles.talkLabel}>Talk</p>
            <p className={styles.talk}>{talk}</p>
          </div>
        )}

        {profileLink && (
          <a
            href={profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileBtn}
          >
            View Profile →
          </a>
        )}

      </div>

    </div>
  );
}