export type Menu = {
    name: string,
    iconClass: string,
    active: boolean,
    url:string,
    submenu: { name: string, url: string }[]
}