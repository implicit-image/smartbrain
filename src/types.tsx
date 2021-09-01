import { type } from 'os'
import React from 'react'


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


export enum Route {
  HOME,
  SIGN_IN,
  SIGN_UP
}



export type {
  BoundingBox,
  BoxCoords
}
