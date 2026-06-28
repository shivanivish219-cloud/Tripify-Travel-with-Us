import { Link } from "react-router-dom";

const interests = [
  { label: "Wildlife", anchor: "wildlife" },
  { label: "Beach", anchor: "beach" },
  { label: "Hill Station", anchor: "hill" },
  { label: "Pilgrimage", anchor: "pilgrimage" },
  { label: "Heritage", anchor: "heritage" },
  { label: "Adventure", anchor: "adventure" },
];

export default function InterestLinks() {
  return (
    <>
      <h1>Packages by Interest</h1>
      <ul className="nav-list2">
        {interests.map((i) => (
          <li key={i.anchor}>
            <Link to={`/destinations?category=${i.anchor}`}>{i.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
