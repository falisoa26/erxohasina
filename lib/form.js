export function creatButtonSA(type, classeName, content) {
    const btn = document.createElement("button");
    btn.classList.add(classeName);
    btn.setAttribute("type", type)
    btn.textContent = content;
    return btn
}