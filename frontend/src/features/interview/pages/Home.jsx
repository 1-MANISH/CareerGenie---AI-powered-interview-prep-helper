import "../style/home.scss"

function Home() {
        return (
                <main className="home">
                        <div className="interview-input-group">
                                <div className="left">
                                        <textarea 
                                                name="jobDescription" 
                                                id="jobDescription"
                                                placeholder="Enter job description ... "
                                        >

                                        </textarea>
                                </div>
                                <div className="right">
                                        <div className="input-group">
                                                <p>Resume
                                                        <small className="highlight"> (Use Resume and self description together for best result)</small> </p>
                                                <label className="file-label" htmlFor="resume">Upload Resume</label>
                                                <input 
                                                        type="file" 
                                                        name="resume"
                                                        id="resume"
                                                        accept=".pdf"
                                                        hidden
                                                />
                                        </div>
                                        <div className="input-group">
                                                <label htmlFor="selfDescription">  Self Description</label>
                                                <textarea 
                                                        name="selfDescription" 
                                                        id="selfDescription"
                                                        placeholder="Enter self description ... "
                                                >

                                                </textarea>
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