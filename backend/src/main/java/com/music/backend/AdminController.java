package com.music.backend;

import com.music.backend.entity.Song;
import com.music.backend.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private SongRepository songRepository;

    // Save files inside Spring Boot static folder
    private final String STATIC_DIR = "src/main/resources/static/assets/";
    private final String MUSIC_DIR = STATIC_DIR + "music/";
    private final String IMAGE_DIR = STATIC_DIR + "images/";

    private final String BASE_URL = "http://localhost:8080/assets/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadSong(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("audio") MultipartFile audioFile,
            @RequestParam("cover") MultipartFile coverFile,
            @RequestParam(value = "lyrics", required = false) String lyrics
    ) throws IOException {

        // Create directories if not exist
        new File(MUSIC_DIR).mkdirs();
        new File(IMAGE_DIR).mkdirs();

        // Save audio file
        File audioDest = new File(MUSIC_DIR + audioFile.getOriginalFilename());
        audioFile.transferTo(audioDest);

        // Save cover image
        File coverDest = new File(IMAGE_DIR + coverFile.getOriginalFilename());
        coverFile.transferTo(coverDest);

        // Create Song object
        Song song = new Song();
        song.setTitle(title);
        song.setArtist(artist);
        song.setAudio(BASE_URL + "music/" + audioFile.getOriginalFilename());
        song.setCoverImage(BASE_URL + "images/" + coverFile.getOriginalFilename());
        

        songRepository.save(song);

        return ResponseEntity.ok("Song uploaded successfully!");
    }
}