package com.music.backend.controller;

import com.music.backend.entity.Song;
import com.music.backend.repository.SongRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/songs")
@CrossOrigin
public class SongController {

    private final SongRepository repo;

    public SongController(SongRepository repo) {
        this.repo = repo;
    }

    // GET all songs
    @GetMapping
    public List<Song> getAllSongs() {
        return repo.findAll();
    }

    // UPLOAD SONG
    @PostMapping("/upload")
    public Song uploadSong(
            @RequestParam String title,
            @RequestParam String artist,
            @RequestParam MultipartFile audio,
            @RequestParam MultipartFile image
    ) throws IOException {

        String basePath = System.getProperty("user.dir");

        File audioDir = new File(basePath + "/uploads/audio");
        File imageDir = new File(basePath + "/uploads/images");

        if (!audioDir.exists()) audioDir.mkdirs();
        if (!imageDir.exists()) imageDir.mkdirs();

        String audioPath = "uploads/audio/" + audio.getOriginalFilename();
        String imagePath = "uploads/images/" + image.getOriginalFilename();

        audio.transferTo(new File(basePath + "/" + audioPath));
        image.transferTo(new File(basePath + "/" + imagePath));

        Song song = new Song();
        song.setTitle(title);
        song.setArtist(artist);
        song.setAudio(audioPath);
        song.setCoverImage(imagePath);

        return repo.save(song);
    }
}