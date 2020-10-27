const deviceChecker = (req) => {
    const isDev = process.env.NODE_ENV !== "production";
    let userAgent = req.headers["user-agent"];

    let isMobile = Boolean(userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))

    return isMobile;
}

export default deviceChecker;