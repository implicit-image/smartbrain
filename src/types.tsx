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
export type {
  BoundingBox,
  BoxCoords
}
