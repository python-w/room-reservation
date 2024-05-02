import IndexPlaceholderBg from "../images/index_placeholder_bg.svg";
import IndexPlaceholderIcon from "../images/index_placeholder_icon.svg";


export default function Search() {

  return (
    <>
      <div className="index-placeholder">
        <div className="indexp-icon">
          <img src={IndexPlaceholderBg} alt="index-placeholder-bg" className="index-placeholder-bg img-fluid"/>
          <img src={IndexPlaceholderIcon} alt="index-placeholder-icon" className="index-placeholder-icon img-fluid"/>
        </div>
        <p className="indexp-text">Please enter details and Search to <br />find relevant rooms available</p>
      </div>
    </>
  );
}
