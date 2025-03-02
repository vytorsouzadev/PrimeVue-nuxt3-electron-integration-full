export function useAnimation(baseClass = true) {
  function getAnimationClasses(animation, options = {}) {
    const classes = []
    
    if (baseClass) {
      classes.push('animate__animated')
    }
    
    if (animation) {
      classes.push(`animate__${animation}`)
    }
    
    if (options.delay) {
      classes.push(`animate__delay-${options.delay}`)
    }
    
    if (options.speed) {
      classes.push(`animate__${options.speed}`)
    }
    
    if (options.infinite) {
      classes.push('animate__infinite')
    }
    
    return classes
  }
  
  return {
    getAnimationClasses
  }
}
