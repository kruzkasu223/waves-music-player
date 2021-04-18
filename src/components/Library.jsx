import LibrarySong from "./LibrarySong";

export default function Library({
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
    libraryStatus,
}) {
    return (
        <div className={`library ${libraryStatus ? "active_library" : ""}`}>
            <h2>Library</h2>
            <div className="library_songs">
                {songs.map((song) => (
                    <LibrarySong
                        setCurrentSong={setCurrentSong}
                        song={song}
                        setSongs={setSongs}
                        songs={songs}
                        id={song.id}
                        key={song.id}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                    />
                ))}
            </div>
        </div>
    );
}
