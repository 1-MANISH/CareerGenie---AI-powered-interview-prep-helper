import "../style/home.scss"
import { MdDescription } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbCloudUpload } from "react-icons/tb";
import { CiCircleAlert } from "react-icons/ci";
function Home() {
        return (
                <main className="home">
                          <div className="interview">
                                                {/* Header Section */}
                                                <div className="interviewHeading">
                                                        <h1 className="mainInterviewHeading">
                                                                Create Your Custom <span className="highlight">Interview Plan</span>
                                                        </h1>
                                                        <p className="subInterviewHeading">
                                                                let your AI analyze the job requirements and your unique profile to build a winning strategy
                                                        </p>
                                                </div>
                        
                                                {/* Main Content Section */}
                                                <div className="interviewInputGroup">
                                                        {/* Left Side - Job Description */}
                                                        <div className="left">
                                                                <div className="jobDescriptionHeader">
                                                                        <div className="jobDescriptionTitle">
                                                                                <span className="jobDescriptionIcon"><MdDescription /></span>
                                                                                <span className="jobDescriptionLabel">Target Job Description</span>
                                                                        </div>
                                                                        <span className="requiredBadge">Required</span>
                                                                </div>
                                                                <div className="inputGroup">
                                                                        <textarea
                                                                                className="jobDescriptionInput"
                                                                                placeholder="Enter job description ..."
                                                                        />
                                                                </div>
                                                        </div>
                        
                                                        {/* Right Side - User Profile */}
                                                        <div className="right">
                                                                {/* Your Profile Header */}
                                                                <div className="profileHeader">
                                                                        <div className="profileTitle">
                                                                                <span className="profileIcon"><FaUser /></span>
                                                                                <span className="profileLabel">Your Profile</span>
                                                                        </div>
                                                                </div>
                        
                                                                {/* Resume Section */}
                                                                <div className="profileSection">
                                                                        <div className="resumeHeader">
                                                                                <span className="resumeLabel">Resume</span>
                                                                                <span className="requiredBadge">For best result</span>
                                                                        </div>
                                                                        <label className="fileUploadLabel">
                                                                                <input type="file" className="fileInput" accept=".pdf" />
                                                                                <div className="uploadContent">
                                                                                        <TbCloudUpload className="uploadIcon" />
                                                                                        <p className="uploadText">Upload Resume</p>
                                                                                        <p className="uploadInstruction">Click to upload or drag & drop</p>
                                                                                        <p className="uploadFormat">PDF (Max 5 MB)</p>
                                                                                </div>
                                                                        </label>
                                                                </div>
                        
                                                                {/* Or Divider */}
                                                                <div className="orDivider">
                                                                        <div className="dividerLine"></div>
                                                                        <span className="orText">Or</span>
                                                                        <div className="dividerLine"></div>
                                                                </div>
                        
                                                                {/* Self Description Section */}
                                                                <div className="profileSection">
                                                                        <div className="selfDescriptionHeader">
                                                                                <span className="selfDescriptionLabel">Self Description</span>
                                                                        </div>
                                                                        <div className="inputGroup">
                                                                                <textarea
                                                                                        className="selfDescriptionInput"
                                                                                        placeholder="Enter self description ..."
                                                                                />
                                                                        </div>
                                                                </div>
                        
                                                                {/* Info Message */}
                                                                <div className="infoMessage">
                                                                        <span className="infoIcon"><CiCircleAlert /></span>
                                                                        <span className="infoText">
                                                                                Either a <span className="highlight">Resume</span> or a <span className="highlight">Self Description</span> is required to generate a personalized interview plan
                                                                        </span>
                                                                </div>
                                                        </div>
                                                </div>
                        
                                                {/* Bottom Section */}
                                                <div className="bottomSection">
                                                        <div className="estimateTime">
                                                                <span className="estimateLabel">AI-Powered Strategy Generation . Approx 1m</span>
                                                        </div>
                                                        <button className="button primary-button">
                                                                Generate Interview Report
                                                        </button>
                                                </div>
                                        </div>
                </main>
        )
}

export default Home