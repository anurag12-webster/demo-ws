document.addEventListener('DOMContentLoaded',function(){
    const filterButtons=document.querySelectorAll('.filter-button');
    const galleryItems=document.querySelectorAll('.gallery-item');
    filterButtons.forEach(button=>{
      button.addEventListener('click',()=>{
        filterButtons.forEach(btn=>btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue=button.getAttribute('data-filter');
        galleryItems.forEach((item,index)=>{
          item.style.animation='none';
          item.offsetHeight;
          if(filterValue==='all'||item.getAttribute('data-category')===filterValue){
            item.style.display='block';
            item.style.animation='fadeInUp 0.6s ease forwards';
            item.style.animationDelay=`${0.1*index}s`;
          }else{
            item.style.display='none';
          }
        });
      });
    });
    const audioTabs=document.querySelectorAll('.audio-tab');
    const audioContents=document.querySelectorAll('.audio-content');
    audioTabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        audioTabs.forEach(t=>t.classList.remove('active'));
        audioContents.forEach(content=>content.classList.remove('active'));
        tab.classList.add('active');
        const tabId=tab.getAttribute('data-audio-tab');
        document.getElementById(tabId).classList.add('active');
        const audioCards=document.getElementById(tabId).querySelectorAll('.audio-card');
        audioCards.forEach((card,index)=>{
          card.style.animation='none';
          card.offsetHeight;
          card.style.animation='fadeInUp 0.6s ease forwards';
          card.style.animationDelay=`${0.1*index}s`;
        });
      });
    });
    const dubbingVideo=document.getElementById('dubbing-video');
    const englishAudio=document.getElementById('english-audio');
    const hindiAudio=document.getElementById('hindi-audio');
    const languageButtons=document.querySelectorAll('.language-btn');
    const playButton=document.querySelector('.dubbing-play-btn');
    const playIcon=document.querySelector('.dubbing-play-icon');
    const pauseIcon=document.querySelector('.dubbing-pause-icon');
    const muteButton=document.querySelector('.dubbing-mute-btn');
    const volumeIcon=document.querySelector('.dubbing-volume-icon');
    const muteIcon=document.querySelector('.dubbing-mute-icon');
    const progressBar=document.querySelector('.dubbing-progress-bar');
    const progressContainer=document.querySelector('.dubbing-progress');
    let activeAudio=englishAudio;
    let isMuted=true;
    function syncAudio(){
      activeAudio.currentTime=dubbingVideo.currentTime;
      if(!dubbingVideo.paused&&!isMuted){
        activeAudio.play();
      }
    }
    dubbingVideo.addEventListener('loadedmetadata',()=>{
      dubbingVideo.muted=true;
      isMuted=true;
      englishAudio.addEventListener('loadedmetadata',()=>{englishAudio.pause();});
      hindiAudio.addEventListener('loadedmetadata',()=>{hindiAudio.pause();});
    });
    function switchLanguage(lang){
      activeAudio.pause();
      const currentTime=dubbingVideo.currentTime;
      const isPlaying=!dubbingVideo.paused;
      if(lang==='english'){activeAudio=englishAudio;}
      else if(lang==='hindi'){activeAudio=hindiAudio;}
      activeAudio.currentTime=currentTime;
      if(isPlaying&&!isMuted){activeAudio.play();}
    }
    languageButtons.forEach(button=>{
      button.addEventListener('click',()=>{
        languageButtons.forEach(btn=>btn.classList.remove('active'));
        button.classList.add('active');
        const lang=button.getAttribute('data-language');
        switchLanguage(lang);
      });
    });
    playButton.addEventListener('click',()=>{
      if(dubbingVideo.paused){
        dubbingVideo.play();
        if(!isMuted){activeAudio.play();}
        playIcon.style.display='none';
        pauseIcon.style.display='inline';
      }else{
        dubbingVideo.pause();
        activeAudio.pause();
        playIcon.style.display='inline';
        pauseIcon.style.display='none';
      }
    });
    muteButton.addEventListener('click',()=>{
      if(isMuted){
        dubbingVideo.muted=true;
        activeAudio.volume=1;
        activeAudio.currentTime=dubbingVideo.currentTime;
        if(!dubbingVideo.paused){activeAudio.play();}
        isMuted=false;
        volumeIcon.style.display='inline';
        muteIcon.style.display='none';
      }else{
        activeAudio.pause();
        isMuted=true;
        volumeIcon.style.display='none';
        muteIcon.style.display='inline';
      }
    });
    dubbingVideo.addEventListener('timeupdate',()=>{
      const percentage=(dubbingVideo.currentTime/dubbingVideo.duration)*100;
      progressBar.style.width=`${percentage}%`;
      if(!isMuted&&Math.abs(activeAudio.currentTime-dubbingVideo.currentTime)>0.3){
        activeAudio.currentTime=dubbingVideo.currentTime;
      }
    });
    progressContainer.addEventListener('click',e=>{
      const pos=(e.pageX-progressContainer.getBoundingClientRect().left)/progressContainer.offsetWidth;
      dubbingVideo.currentTime=pos*dubbingVideo.duration;
      if(!isMuted){activeAudio.currentTime=dubbingVideo.currentTime;}
    });
    const vfxContainers=document.querySelectorAll('.vfx-video-container');
    vfxContainers.forEach(container=>{
      const video=container.querySelector('.vfx-video-player');
      const playBtn=container.querySelector('.vfx-play-button');
      playBtn.addEventListener('click',()=>{
        if(video.paused){
          video.play();
          playBtn.style.display='none';
        }else{
          video.pause();
        }
      });
      video.addEventListener('play',()=>{playBtn.style.display='none';});
      video.addEventListener('pause',()=>{playBtn.style.display='flex';});
    });
  });
  