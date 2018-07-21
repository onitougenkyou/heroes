import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-level-bar',
  templateUrl: './level-bar.component.html',
  styleUrls: ['./level-bar.component.scss']
})
export class LevelBarComponent implements OnInit {
  playerData = null;
  xpLength = null;
  constructor() { }

  ngOnInit() {
    const localPlayer = JSON.parse(localStorage.getItem('player'));
    this.playerData = localPlayer;
    this.setXpBar(localPlayer.experience);
  }

  setXpBar(xp) {
    $('.progressbar').each(function () {
      console.log(xp);
      var t = $(this);
      var barperc = Math.round(xp * 4.05);
      t.find('.bar').animate({ height: barperc }, xp * 25);
      t.find('.label').append('<div class="perc"></div>');

      function perc() {
        var length = t.find('.bar').css('height'),
          perc = Math.round(parseInt(length) / 5),
          labelpos = (parseInt(length) - 2);
        t.find('.label').css('left', labelpos);
        t.find('.perc').text(perc + '%');
      }
      perc();
      setInterval(perc, 0);
    });
  }
}
