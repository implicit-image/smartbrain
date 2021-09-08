

interface BoundingBox {
  top_row: number,
  right_col: number,
  bottom_row: number,
  left_col: number
}


interface BoxCoords {
  top_row: number,
  right_column: number,
  bottom_row: number,
  left_column: number
}

interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  entries: number,
  joined: string
}

export enum Route {
  HOME,
  SIGN_IN,
  SIGN_UP
}



export type {
  BoundingBox,
  BoxCoords,
  User
}
