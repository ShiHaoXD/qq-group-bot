import { foods } from "./config"

export const genWhatToEat = () => foods[Math.floor(Math.random() * foods.length)]
