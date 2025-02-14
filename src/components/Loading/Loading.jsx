import { HashLoader } from "react-spinners";

// import style from "./Loading.module.css";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading() {
  return (
    <div className="sweet-loading py-10">
      <HashLoader
        color={"#0aad0a"}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
