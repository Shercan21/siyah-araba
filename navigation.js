// Browser/Android Back follows screen history, without one entry per answer.
(() => {
  const key = 'siyahNavigation';
  const session = String(Date.now());
  const dialog = document.querySelector('#settings');
  const entries = [];
  let position = 0, moving = false;
  function capture() {
    const activity = ['game', 'puzzle', 'pairs', 'basket', 'complete', 'mini-complete'].includes(screen);
    const route = {screen, category: category?.id, item: typeof taughtItem === 'undefined' ? null : taughtItem,
      storyIndex, storyPage, dialogueIndex, modal: dialog.open,
      needsTab, sentenceItem, sentencePartsDone, pairs: screen==='pairs'?{deck:[...pairDeck],flipped:[...pairFlipped],matched:[...pairMatched],saved:pairSaved}:null, basket: screen==='basket'?{items:[...basketItems],inside:[...basketInside],target:basketTarget,taken:basketTaken,named:basketNamed}:null};
    route.key = (activity ? 'activity:' + category.id + ':' + (miniKind || 'find') :
      ['modes', 'lesson'].includes(screen) ? screen + ':' + category.id :
      screen==='needs' ? 'needs:'+needsTab : screen) + (route.modal ? ':modal' : '');
    if (activity) route.game = {round, target, options: [...options], locked, lastTarget, sessionSaved,
      questionWrong, questionHelped, miniKind, memoryPhase, puzzleOrder: [...puzzleOrder],
      puzzleRows, puzzleCols, puzzleSelected, puzzleSolved, puzzleMoves};
    if(screen.startsWith('explore-')){route.explore={hub:exploreHub,part:explorePart,mode:exploreMode,queue:[...exploreQueue],round:exploreRound,options:[...exploreOptions],locked:exploreLocked,wrong:exploreWrong,helped:exploreHelped,showModel:exploreShowModel,saved:exploreSaved,interactive:captureAttentionInteractive()};route.key=(screen==='explore-home'?'explore-home:'+exploreHub:screen==='explore-menu'?'explore-menu:'+explorePart:'explore-task:'+explorePart+':'+exploreMode)+(route.modal?':modal':'')}
    return route;
  }
  const state = () => ({[key]: session, position});
  function restore(route) {
    cancelSpeech();
    if (dialog.open) dialog.close();
    if (route.category) category = groups.find(group => group.id === route.category);
    if(route.explore){const data=route.explore;exploreHub=data.hub;explorePart=data.part;exploreMode=data.mode;exploreQueue=[...data.queue];exploreRound=data.round;exploreOptions=[...data.options];exploreLocked=data.locked;exploreWrong=data.wrong;exploreHelped=data.helped;exploreShowModel=data.showModel;exploreSaved=data.saved;restoreAttentionInteractive(data.interactive);if(route.screen==='explore-home')exploreHome(exploreHub);else if(route.screen==='explore-menu')exploreMenu(explorePart);else if(route.screen==='explore-done')completeExplore();else if(route.screen==='explore-drawing')drawingHome();else if(route.screen==='explore-maze')mazeHome();else renderExploreTask();}
    else if (route.game) {
      ({round, target, options, locked, lastTarget, sessionSaved, questionWrong, questionHelped,
        miniKind, memoryPhase, puzzleOrder, puzzleRows, puzzleCols, puzzleSelected, puzzleSolved, puzzleMoves} = route.game);
      // Keep the saved snapshot independent of mutable game arrays.
      options = [...options]; puzzleOrder = [...puzzleOrder]; screen = route.screen;
      if (screen === 'pairs') {stopPairTimer();pairEpoch++;pairDeck=[...route.pairs.deck];pairFlipped=route.pairs.flipped.length===2?[]:[...route.pairs.flipped];pairMatched=[...route.pairs.matched];pairSaved=route.pairs.saved;renderPairs();}
      else if (screen === 'basket') {basketItems=[...route.basket.items];basketInside=[...route.basket.inside];basketTarget=route.basket.target;basketTaken=route.basket.taken;basketNamed=route.basket.named;renderBasket();}
      else if (screen === 'puzzle') renderPuzzle();
      else if (screen === 'complete' || screen === 'mini-complete') complete();
      else {
        renderQuestion();
        if (locked) {
          locked = false;
          answer(document.querySelector('[data-answer="' + target + '"]'));
          if (questionHelped && document.querySelector('#helped')) document.querySelector('#helped').onclick();
        }
      }
    } else if (route.screen === 'modes') lessonMenu(route.category);
    else if (route.screen === 'lesson') showLesson(route.item);
    else if (route.screen === 'stories') storyHome();
    else if (route.screen === 'story') {storyIndex = route.storyIndex; storyPage = route.storyPage; readStory();}
    else if (route.screen === 'talk') talkHome();
    else if (route.screen === 'dialogue') dialogue(route.dialogueIndex);
    else if (route.screen === 'needs') needsHome(route.needsTab);
    else if (route.screen === 'sentences') {
      sentenceItem=route.sentenceItem; sentencePartsDone=route.sentencePartsDone; sentenceHome(false);
    }
    else if (route.screen === 'profile') profileEntry();
    else home();
    if (route.modal) document.querySelector('#parent').onclick();
    window.scrollTo(0, 0);
  }
  function sync() {
    if (moving) return;
    const route = capture();
    if (route.key === entries[position].key) {
      entries[position] = route;
      return;
    }
    const previous = entries.findLastIndex((entry, index) => index < position && entry.key === route.key);
    if (previous >= 0) {
      entries[previous] = route;
      moving = true;
      history.go(previous - position);
    } else {
      entries.splice(position + 1);
      entries.push(route); position++;
      history.pushState(state(), '', location.href);
    }
  }
  entries.push(capture());
  history.replaceState(state(), '', location.href);
  window.addEventListener('popstate', event => {
    if (event.state?.[key] !== session || !entries[event.state.position]) return;
    moving = true;
    const route = entries[event.state.position];
    // Closing a parent dialog must not restart the game underneath it.
    const current = capture();
    position = event.state.position;
    if (current.modal && !route.modal && current.key === route.key + ':modal') {
      cancelSpeech(); dialog.close();
    } else restore(route);
    moving = false;
  });
  new MutationObserver(sync).observe(document.querySelector('#app'), {childList: true, subtree: true});
  new MutationObserver(sync).observe(dialog, {attributes: true, attributeFilter: ['open']});
  document.querySelector('.brand').addEventListener('click', event => {
    event.preventDefault(); cancelSpeech();
    if (dialog.open) dialog.close();
    home();
  });
})();
