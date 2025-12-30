export const menuSlide = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
}

export const slide = {
    initial: { x: 80 },
    enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
    exit: (i: number) => ({ x: 80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } })
}

export const scale = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } }
}

export const menu = {
    open: (isMobile?: boolean) => ({
        width: isMobile ? "calc(100vw - 32px)" : "480px",
        height: isMobile ? "calc(100vh - 32px)" : "650px",
        top: isMobile ? "-16px" : "-25px",
        right: isMobile ? "-16px" : "-25px",
        transition: { duration: 0.75, type: "tween" as const, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }),
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween" as const, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
}

export const perspective = {
    initial: {
        opacity: 0,
        rotateX: 90,
        translateY: 80,
        translateX: -20,
    },
    enter: (i: number) => ({
        opacity: 1,
        rotateX: 0,
        translateY: 0,
        translateX: 0,
        transition: {
            duration: 0.65,
            opacity: { duration: 0.35 },
            delay: 0.5 + (i * 0.1),
            ease: [.215, .61, .355, 1] as [number, number, number, number]
        }
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: "linear" as const }
    }
}

export const slideIn = {
    initial: {
        opacity: 0,
        y: 20
    },
    enter: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: 0.75 + (i * 0.1),
            ease: [.215, .61, .355, 1] as [number, number, number, number]
        }
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.5, type: "tween" as const, ease: "easeInOut" as const }
    }
}
