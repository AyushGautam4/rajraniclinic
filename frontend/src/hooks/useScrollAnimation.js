import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove('opacity-0', 'translate-y-8')
          element.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(element)
        }
      },
      { threshold }
    )
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])
  
  return ref
}
