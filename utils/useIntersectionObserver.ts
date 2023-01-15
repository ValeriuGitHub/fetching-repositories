type intersectionCallback = (entry: IntersectionObserverEntry) => void

const intersectionHandler =
  (isIntersectingFn: intersectionCallback) =>
  (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry) => {
      isIntersectingFn(entry)
    })
  }

type TIntersectionHandler = typeof intersectionHandler

const composeObserverElement =
  (intersectionHandler: TIntersectionHandler) =>
  (
    element: HTMLElement,
    isIntersectingFn: intersectionCallback,
    options?: IntersectionObserverInit
  ) => {
    const handleIntersection = intersectionHandler(isIntersectingFn)

    const observer = new IntersectionObserver(handleIntersection, options)

    observer.observe(element)
  }

export default {
  observeElement: composeObserverElement(intersectionHandler),
}
