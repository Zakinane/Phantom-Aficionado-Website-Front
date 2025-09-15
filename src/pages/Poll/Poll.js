function Poll(){
    return(
        <div className="poll">
          <div className="title">
            <div className="background-POLL">POLL</div>
            <div id="POLL">
              P<span style={{ color: "rgb(222, 15, 15)" }}>O</span>LL
              <span className="sub-title">
                OF THE WEEK
                <div className="background-WEEK">OF THE WEEK</div>
              </span>
            </div>
          </div>
          <div className="poll-container">
            <div className="poll-question">
              <p>
                <span style={{ fontSize: 45, color: "red" }}>Q</span>Do you
                believe in the Phantom Thieves?
              </p>
            </div>
            <div className="poll-result">
              <span style={{ fontSize: 45, color: "red" }}>A</span>
              <span className="poll-percentage" style={{ fontSize: 20 }}>
                YES
              </span>
              <span className="poll-percentage" style={{ fontSize: 100 }}>
                44
              </span>
              <span className="poll-percentage" style={{ fontSize: 60 }}>
                %
              </span>
              <center>
                <hr />
              </center>
            </div>
            <div className="poll-bar-border">
              <div className="poll-bar">
                <div className="poll-bar-yes" style={{ width: "44%" }} />
              </div>
            </div>
            <div className="poll-options">
              <div className="poll-btn-border" id="poll-btn-yes">
                <div className="poll-btn" id="poll-btn-yes">
                  YES
                </div>
              </div>
              <div className="poll-btn-border" id="poll-btn-no">
                <div className="poll-btn" id="poll-btn-no">
                  NO
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-message">Scroll to read comments</div>
          <div className="scroll-btn-container">
            <div className="scroll-btn">
              <img alt="" width="40px" src="../images/icons/arrow.png" />
            </div>
          </div>
        </div>
    )
}
export default Poll