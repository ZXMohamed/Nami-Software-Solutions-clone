export const navBarAosAnimation = {
    ["data-aos"]: "navBarShrink",
    ["data-aos-duration"]: "3000",
    ["data-aos-offset"]: "930",
    ["data-aos-once"]: "false"
}

export const activeTabAosAnimation = (id) => ({
    ["data-aos"]: "activeTab",
    ["data-aos-once"]: "false",
    ["data-aos-anchor-placement"]: "top-top",
    ["data-aos-anchor"]: "#" + id,
    ["data-aos-mirror"]: "true"
});