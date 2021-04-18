export default function LibrarySong({
    song,
    songs,
    setSongs,
    setCurrentSong,
    id,
    audioRef,
    isPlaying,
}) {
    const songSelectHandler = async () => {
        await setCurrentSong(song);

        const activeSong = songs.map((song) => {
            if (song.id === id) {
                return { ...song, active: true };
            } else {
                return { ...song, active: false };
            }
        });
        setSongs(activeSong);
        if (isPlaying) audioRef.current.play();
    };

    return (
        <div
            onClick={songSelectHandler}
            className={`library_song ${song.active ? "selected_song" : ""}`}
        >
            <img src={song.cover} alt={song.name} />
            <div className="song_description">
                <h4>{song.name}</h4>
                <h6>{song.artist}</h6>
            </div>
        </div>
    );
}
