import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
    faVolumeMute,
    faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Player({
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    songs,
    setCurrentSong,
    setSongs,
}) {
    const activeLibraryHandler = (nextPrev) => {
        const activeSong = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return { ...song, active: true };
            } else {
                return { ...song, active: false };
            }
        });
        setSongs(activeSong);
    };

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );

        if (direction === "forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "backward") {
            if (currentIndex === 0) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
            } else {
                await setCurrentSong(songs[currentIndex - 1]);
                activeLibraryHandler(songs[currentIndex - 1]);
            }
        }
        if (isPlaying) audioRef.current.play();
    };

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    const [volume, setVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const [prevVolumeValue, setPrevVolumeValue] = useState(volume);

    const onVolumeClickHandler = () => {
        if (isMuted) {
            audioRef.current.volume = prevVolumeValue / 100;
            setVolume(prevVolumeValue);
            setIsMuted(false);
        } else {
            audioRef.current.volume = 0;
            setIsMuted(true);
            setVolume(0);
            setPrevVolumeValue(volume);
        }
    };

    const onVolumeChangeHandler = (e) => {
        const volumeLevel = e.target.value / 100;
        audioRef.current.volume = volumeLevel;
        setVolume(e.target.value);
    };

    return (
        <div className="player">
            <div className="time_control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                    }}
                    className="track"
                >
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnim} className="animate_track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play_volume_wrapper">
                <div className="play_control">
                    <FontAwesomeIcon
                        onClick={() => skipTrackHandler("backward")}
                        className="btn_control skip_backward"
                        size="2x"
                        icon={faAngleLeft}
                    />
                    <FontAwesomeIcon
                        onClick={() => playSongHandler()}
                        className="btn_control play"
                        size="2x"
                        icon={isPlaying ? faPause : faPlay}
                    />
                    <FontAwesomeIcon
                        onClick={() => skipTrackHandler("forward")}
                        className="btn_control skip_forward"
                        size="2x"
                        icon={faAngleRight}
                    />
                </div>
                <div className="volume_control">
                    <div
                        className="track_volume"
                        style={{
                            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                        }}
                    >
                        <input
                            type="range"
                            min={0}
                            max={100}
                            onChange={onVolumeChangeHandler}
                            value={volume}
                        />
                        <div
                            className="animate_volume"
                            style={{ transform: `translateX(${volume}%)` }}
                        ></div>
                    </div>
                    <FontAwesomeIcon
                        onClick={onVolumeClickHandler}
                        className="volume_icon"
                        icon={isMuted ? faVolumeMute : faVolumeUp}
                    />
                </div>
            </div>
        </div>
    );
}
