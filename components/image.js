
export default function Image({title,image}) {
  return (
    <>
      <div className="row d-flex  align-items-center vc_custom_1680183602348 row-has-fill">
        <div className="col-md-6 vc_custom_1680183602348 vc_row-has-fill">
          <h1 className="Page_title">
            <span style={{ color: "#fceb25", fontSize: "50px" }}>
              NETY&nbsp;
            </span>
            <span style={{ color: "#ffffff", fontSize: "50px" }}>{title}</span>
          </h1>
        </div>
        <div class="col-md-6 vc_custom_1680183602348 vc_row-has-fill">
          <img
            src={image}
            alt="nety security"
          />
        </div>
      </div>
      
    </>
  );
}
