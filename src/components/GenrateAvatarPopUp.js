import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GenrateAvatarPopUp = ({ modelId }) => {
  const navigate = useNavigate();

  const [serverState, setServerState] = useState(false);

  useEffect(() => {
    const checkServerRunning = async () => {
      try {
        const { data } = await axios.get(
          "https://avatar-gen.ingnious.ai/api/v1/avatar/health"
        );

        setServerState(true);
      } catch (error) {
        setServerState(false);
      }
    };
    checkServerRunning();
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        // style={{ background: "#5F5B5B" }}
      >
        <div className="modal-dialog  modal-dialog-centered  ">
          <div
            className="modal-content  bg-black "
            style={{ border: "1px solid #2E2E2E" }}
          >
            {
              <div className="">
                <div
                  className="modal-header justify-content-between"
                  style={{ borderBottom: "1.3px solid #2E2E2E" }}
                >
                  <h5 className="modal-title text-light" id="exampleModalLabel">
                    Generate Avatar
                  </h5>
                  <button
                    className=" p-0"
                    type="button "
                    data-bs-dismiss="modal"
                    style={{
                      border: "0px",
                      outline: "0px",
                      background: "transparent",
                    }}
                  >
                    <Icon
                      icon="ic:round-close"
                      width={30}
                      className="text-light"
                    />
                  </button>
                </div>
                <div className="modal-body " style={{ height: "350px" }}>
                  {/* default avatar selection */}
                  <div className="">
                    <div>
                      <p className="text-light">
                        Select from our sample avatars
                      </p>
                      <div className="mt-2 d-flex" style={{ gap: "1em" }}>
                        <div
                          className=" pb-0 rounded-0 ps-0 pe-0 col-3 card"
                          onClick={() => {
                            localStorage.setItem(
                              "modelId",
                              "plugin-default-v2"
                            );
                            localStorage.setItem("heightId", 160);
                            localStorage.setItem("weightId", 70);
                            localStorage.setItem(
                              "hairstyle",
                              "Hair_Classic_Short"
                            );
                            localStorage.setItem(
                              "haircolor",
                              "LightBrown"
                            );
                            window.location.reload();
                            // dispatch({
                            //   type: "GET_AVATAR_DETAILS_SUCCESS",
                            //   payload: {
                            //     modelId: "plugin-default-v2",
                            //     weightId: 70,
                            //     heightId: 160,
                            //   },
                            // });
                          }}
                          style={{
                            backgroundColor: "#151515",
                            border:
                              modelId === "plugin-default-v2" &&
                              "1px solid #9858FF",
                          }}
                        >
                          <img
                            src="https://ig-app-assets.s3.ap-south-1.amazonaws.com/utils/Nachiket-thumbnail.png"
                            className="img-fluid "
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="model-footer p-2">
                  <div>
                    <button
                      disabled={!serverState}
                      data-bs-dismiss="modal"
                      onClick={() => navigate("/generate")}
                      className={`btn ${
                        serverState ? "btn-primary" : "btn-secondary"
                      }   w-100 rounded-0 text-light btn-block p-2 `}
                      style={{ fontWeight: 500 }}
                    >
                      {serverState ? (
                        "Generate Avatar"
                      ) : (
                        <div className="flex justify-content-center  align-items-center">
                          <Icon
                            icon={"material-symbols:error-outline"}
                            width={30}
                            className="text-light"
                          />{" "}
                          <p className=" text-light ms-2 pt-1 mb-0 ">
                            {" "}
                            Servers are currently offline, please try again
                            later.
                          </p>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default GenrateAvatarPopUp;
