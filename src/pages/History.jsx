import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  FaHistory,
  FaExternalLinkAlt,
  FaFileAlt,
  FaStar,
  FaFilter,
  FaSpinner,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./styles/history.css";

// Sub-component for expandable Job Description cell
const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return <span className="no-desc">No description available</span>;

  const isLong = text.length > 80;
  const displayText = isExpanded || !isLong ? text : `${text.slice(0, 80)}...`;

  return (
    <div className="description-cell">
      <p className="desc-text">{displayText}</p>
      {isLong && (
        <button
          type="button"
          className="toggle-desc-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span> <FaChevronUp />
            </>
          ) : (
            <>
              <span>Read More</span> <FaChevronDown />
            </>
          )}
        </button>
      )}
    </div>
  );
};

const History = React.memo(() => {
  const [history, setHistory] = useState([]);
  const [preferCV, setPreferCV] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleted, setDeleted] = useState(false)

  // Fetch history and preferred CV data concurrently
useEffect(() => {
  const fetchHistoryData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [historyRes, preferRes] = await Promise.allSettled([
        axios.get("http://localhost:8000/history/historyData", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8000/preferCV/preferCVdata", {
          withCredentials: true,
        }),
      ]);

      if (historyRes.status === "fulfilled" && historyRes.value.data) {
        setHistory(historyRes.value.data);
      }

      if (preferRes.status === "fulfilled" && preferRes.value.data?.data) {
        setPreferCV(preferRes.value.data.data);
      }

    } catch (err) {
      console.error("Failed to load history context:", err);
      setError("Unable to fetch analysis history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchHistoryData();
}, []);


const DeleteHistory = async () => {
  const conf = window.confirm(
    "Are you sure you want to delete all your history data?"
  );

  if (!conf) return;

  try {
    const response = await axios.post(
      "http://localhost:8000/delete/deletehistoryData",
      {},
      {
        withCredentials: true,
      }
    );

    if (!response.data.success) return;

    setHistory([]);
    setPreferCV(null);

    setDeleted(true);

    setTimeout(() => {
      setDeleted(false);
    }, 1500);

  } catch (error) {
    console.error("Failed to delete history:", error);
    setError("Unable to delete history. Please try again.");
  }
};



  const activeData = filterType === "all" ? history : preferCV;

  return (
    <div id="history-container">
      {/* Header Bar */}
      <div className="history-header">
        <div className="title-group">
          <FaHistory className="header-icon" />
          <h1>Analysis History</h1>
        </div>

        {/* Filter Controls */}


        <button className="delete-btn" onClick={DeleteHistory}>Delete</button>
        <div className="filter-wrapper">
          <FaFilter className="filter-icon" />
          <select
            id="history-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filter analysis history"
          >
            <option value="all">All Resumes ({history?.length})</option>
            <option value="prefer">
              Preferred Resumes ({preferCV?.length})
            </option>
          </select>
        </div>
        {
          isDeleted && (
            <div className="delete-message">History deleted...</div>
          )
        }
      </div>


      {/* Main Content Table Area */}
      <div className="table-card">
        {isLoading ? (
          <div className="state-container">
            <FaSpinner className="spinner-icon" />
            <p>Loading analysis history...</p>
          </div>
        ) : error ? (
          <div className="state-container error-state">
            <p>{error}</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>#</th>
                  <th style={{ width: "220px" }}>Document Name</th>
                  {filterType === "all" && <th>Job Description</th>}
                  {filterType === "prefer" && <th>Job Target</th>}
                  {filterType === "prefer" && <th>Job Description</th>}
                  <th style={{ width: "160px" }}>Document URL</th>
                  {filterType === "prefer" && (
                    <th style={{ width: "150px" }}>Date Added</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeData?.length > 0 ? (
                  activeData.map((item, idx) => {
                    const isAll = filterType === "all";
                    const fileName = isAll
                      ? item?.files?.originalname || "Unnamed File"
                      : item?.name || "Unnamed File";
                    const fileUrl = isAll ? item?.files?.url : item?.url;
                    const dateFormatted = item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A";

                    return (
                      <tr key={item.id || item._id || idx}>
                        <td className="index-cell">{idx + 1}</td>
                        <td className="name-cell">
                          <div className="file-info">
                            {isAll ? (
                              <FaFileAlt className="doc-icon" />
                            ) : (
                              <FaStar className="star-icon" />
                            )}
                            <span>{fileName}</span>
                          </div>
                        </td>

                        {/* Render Description for All CVs */}
                        {isAll   && (
                          <td>
                            <ExpandableDescription
                              text={item?.description || item?.jobDescription}
                            />
                          </td>
                        )}

                        {/* Render Job Target for Preferred CVs */}
                        {!isAll && (
                          <td>
                            <span className="badge-job-type">
                              {item.jobType || "General"}
                            </span>
                          </td>
                        )}
                        {!isAll && (
                          <td>
                            <ExpandableDescription
                              text={item?.description || item?.jobDescription}
                            />
                          </td>
                        )}

                        <td className="url-cell">
                          {fileUrl ? (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-link"
                            >
                              <span>View PDF</span>
                              <FaExternalLinkAlt />
                            </a>
                          ) : (
                            <span className="no-url">No Link Available</span>
                          )}
                        </td>

                        {!isAll && (
                          <td className="date-cell">
                            <div className="date-wrapper">
                              <FaCalendarAlt />
                              <span>{dateFormatted}</span>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={filterType === "all" ? 4 : 5}
                      className="empty-cell"
                    >
                      <div className="empty-state">
                        <FaFileAlt className="empty-icon" />
                        <p>No analyzed resumes found in this view.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
});

History.displayName = "History";
export default History;
