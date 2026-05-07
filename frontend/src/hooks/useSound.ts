export function useSound(enabled: boolean) {
  function playCorrect() {
    if (!enabled) return
    try {
      const ac = new AudioContext();
      [523, 659, 784].forEach((freq, i) => {
        const osc = ac.createOscillator()
        const gain = ac.createGain()
        osc.connect(gain); gain.connect(ac.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0, ac.currentTime + i * 0.13)
        gain.gain.linearRampToValueAtTime(0.22, ac.currentTime + i * 0.13 + 0.04)
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.13 + 0.36)
        osc.start(ac.currentTime + i * 0.13)
        osc.stop(ac.currentTime + i * 0.13 + 0.4)
      })
    } catch { /* audio unavailable */ }
  }

  function playWrong() {
    if (!enabled) return
    try {
      const ac = new AudioContext()
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain); gain.connect(ac.destination)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(280, ac.currentTime)
      osc.frequency.exponentialRampToValueAtTime(130, ac.currentTime + 0.42)
      gain.gain.setValueAtTime(0.14, ac.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.48)
      osc.start()
      osc.stop(ac.currentTime + 0.5)
    } catch { /* audio unavailable */ }
  }

  return { playCorrect, playWrong }
}
