import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export default function Nav({
    libraryStatus,
    setLibraryStatus,
    darkThemeHandler,
}) {
    return (
        <nav>
            <h1>Waves</h1>

            <button
                onClick={() => setLibraryStatus(!libraryStatus)}
                className={libraryStatus ? "active_library_btn" : ""}
            >
                Library <FontAwesomeIcon icon={faMusic} />
            </button>

            <div className="switch" id="switch">
                <input
                    type="checkbox"
                    name="switch"
                    className="switch-checkbox"
                    id="myswitch"
                    onChange={darkThemeHandler}
                />
                <label className="switch-label" htmlFor="myswitch">
                    <span className="switch-inner"></span>
                    <span className="switch-switch"></span>
                </label>
            </div>
        </nav>
    );
}
