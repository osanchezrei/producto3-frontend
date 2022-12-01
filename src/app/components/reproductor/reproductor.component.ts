import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent {
  @ViewChild('audioElement') audioElement?: ElementRef<HTMLAudioElement>;
  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;

  @Input() media?: string;

  isAudio() {
    return this.media?.match(/\.(mp3|ogg|wav)$/i)
  }

  isVideo() {
    return this.media?.match(/\.(mp4|webm|ogg|ogv|avi|wmv|mov|flv|mpeg|mpg|mkv)$/i)
  }

  play() {
    this.audioElement?.nativeElement?.play()
    this.videoElement?.nativeElement?.play()
  }
  pause() {
    this.audioElement?.nativeElement?.pause()
    this.videoElement?.nativeElement?.pause()
  }
  mute() {
    if (this.audioElement?.nativeElement) {
      this.audioElement.nativeElement.volume = 0;
    }
    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.volume = 0;
    }
  }
  unMute() {
    if (this.audioElement?.nativeElement) {
      this.audioElement.nativeElement.volume = 1;
    }
    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.volume = 1;
    }
  }
  backTo0() {
    this.pause()

    if (this.audioElement?.nativeElement) {
      this.audioElement.nativeElement.currentTime = 0;
    }

    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.currentTime = 0;
    }

    this.play()
  }
}
