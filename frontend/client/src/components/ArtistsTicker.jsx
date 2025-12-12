import ScrollVelocity from "./ScrollVelocity";
import "./ScrollVelocity.css";

function ArtistsTicker() {
  return (
    <div className="scroll-velocity-wrapper">
      <ScrollVelocity
        texts={[
          "DRAKE • TRAVIS SCOTT • KEN CARSON •",
          "PLAYBOI CARTI • LIL TJAY • POP SMOKE •"
        ]}
        velocity={60}
        className="scroll-text"
      />
    </div>
  );
}

export default ArtistsTicker;
