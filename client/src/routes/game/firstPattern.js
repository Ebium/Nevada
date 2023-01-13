const game = {
    "started": true,
    "movesHistory": [],
    "movesCount": 0,
    "pads": [
      {
        "xCoords": [
          1,
          2
        ],
        "yCoords": [
          1,
          2,
          3
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          1,
          2
        ],
        "yCoords": [
          6,
          7,
          8
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          6,
          7,
          8
        ],
        "yCoords": [
          7,
          8
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          4,
          5,
          6
        ],
        "yCoords": [
          3,
          4
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          7,
          8
        ],
        "yCoords": [
          1,
          2
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          7,
          8
        ],
        "yCoords": [
          3,
          4
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          6,
          7
        ],
        "yCoords": [
          5,
          6
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          4,
          5
        ],
        "yCoords": [
          1,
          2
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          3
        ],
        "yCoords": [
          1,
          2,
          3
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          5
        ],
        "yCoords": [
          6,
          7,
          8
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          3,
          4
        ],
        "yCoords": [
          7,
          8
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          1,
          2,
          3
        ],
        "yCoords": [
          4
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          1,
          2,
          3
        ],
        "yCoords": [
          5
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          6
        ],
        "yCoords": [
          1,
          2
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          8
        ],
        "yCoords": [
          5,
          6
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          4,
          5
        ],
        "yCoords": [
          5
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      },
      {
        "xCoords": [
          3,
          4
        ],
        "yCoords": [
          6
        ],
        "firstPlayerCounter": 0,
        "secondPlayerCounter": 0
      }
    ],
    "disabledIndexPads": [],
    "pointsFirstPlayer": 0,
    "pointsSecondPlayer": 0,
    "graphicPads": [
      {
        "x": 1,
        "y": 1,
        "compo": "61"
      },
      {
        "x": 1,
        "y": 6,
        "compo": "61"
      },
      {
        "x": 6,
        "y": 7,
        "compo": "60"
      },
      {
        "x": 4,
        "y": 3,
        "compo": "60"
      },
      {
        "x": 7,
        "y": 1,
        "compo": "4"
      },
      {
        "x": 7,
        "y": 3,
        "compo": "4"
      },
      {
        "x": 6,
        "y": 5,
        "compo": "4"
      },
      {
        "x": 4,
        "y": 1,
        "compo": "4"
      },
      {
        "x": 3,
        "y": 1,
        "compo": "31"
      },
      {
        "x": 5,
        "y": 6,
        "compo": "31"
      },
      {
        "x": 3,
        "y": 7,
        "compo": "4"
      },
      {
        "x": 1,
        "y": 4,
        "compo": "30"
      },
      {
        "x": 1,
        "y": 5,
        "compo": "30"
      },
      {
        "x": 6,
        "y": 1,
        "compo": "21"
      },
      {
        "x": 8,
        "y": 5,
        "compo": "21"
      },
      {
        "x": 4,
        "y": 5,
        "compo": "20"
      },
      {
        "x": 3,
        "y": 6,
        "compo": "20"
      }
    ]
  }

const board = {
    "value": 0,
    "status": "idle",
    "array": [
      [
        {
          "x": 0,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 1,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 2,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 3,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 4,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 5,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 6,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 7,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 8,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 0,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 1,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 1,
          "y": 1,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 2,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 3,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 4,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 5,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 6,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 7,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 8,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 1,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 2,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 2,
          "y": 1,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 2,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 3,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 4,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 5,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 6,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 7,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 8,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 2,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 3,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 3,
          "y": 1,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 2,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 3,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 4,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 5,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 6,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 7,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 8,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 3,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 4,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 4,
          "y": 1,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 2,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 3,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 4,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 5,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 6,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 7,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 8,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 4,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 5,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 5,
          "y": 1,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 2,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 3,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 4,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 5,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 6,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 7,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 8,
          "isFilled": true,
          "color": "yellow",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 5,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 6,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 6,
          "y": 1,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 2,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 3,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 4,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 5,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 6,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 7,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 8,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 6,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 7,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 7,
          "y": 1,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 2,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 3,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 4,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 5,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 6,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 7,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 8,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 7,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 8,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 8,
          "y": 1,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 2,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 3,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 4,
          "isFilled": true,
          "color": "azure",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 5,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 6,
          "isFilled": true,
          "color": "green",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 7,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 8,
          "isFilled": true,
          "color": "salmon",
          "holeFilled": false,
          "holeColor": "white",
          "disabled": false,
          "possibleMove": false
        },
        {
          "x": 8,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ],
      [
        {
          "x": 9,
          "y": 0,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 1,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 2,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 3,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 4,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 5,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 6,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 7,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 8,
          "isFilled": false,
          "color": ""
        },
        {
          "x": 9,
          "y": 9,
          "isFilled": false,
          "color": ""
        }
      ]
    ],
    "history": [
      {
        "coord": [
          [
            1,
            1
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            2,
            1
          ],
          [
            2,
            2
          ],
          [
            2,
            3
          ]
        ]
      },
      {
        "coord": [
          [
            1,
            6
          ],
          [
            1,
            7
          ],
          [
            1,
            8
          ],
          [
            2,
            6
          ],
          [
            2,
            7
          ],
          [
            2,
            8
          ]
        ]
      },
      {
        "coord": [
          [
            6,
            7
          ],
          [
            6,
            8
          ],
          [
            7,
            7
          ],
          [
            7,
            8
          ],
          [
            8,
            7
          ],
          [
            8,
            8
          ]
        ]
      },
      {
        "coord": [
          [
            4,
            3
          ],
          [
            4,
            4
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            6,
            3
          ],
          [
            6,
            4
          ]
        ]
      },
      {
        "coord": [
          [
            7,
            1
          ],
          [
            7,
            2
          ],
          [
            8,
            1
          ],
          [
            8,
            2
          ]
        ]
      },
      {
        "coord": [
          [
            7,
            3
          ],
          [
            7,
            4
          ],
          [
            8,
            3
          ],
          [
            8,
            4
          ]
        ]
      },
      {
        "coord": [
          [
            6,
            5
          ],
          [
            6,
            6
          ],
          [
            7,
            5
          ],
          [
            7,
            6
          ]
        ]
      },
      {
        "coord": [
          [
            4,
            1
          ],
          [
            4,
            2
          ],
          [
            5,
            1
          ],
          [
            5,
            2
          ]
        ]
      },
      {
        "coord": [
          [
            3,
            1
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      },
      {
        "coord": [
          [
            5,
            6
          ],
          [
            5,
            7
          ],
          [
            5,
            8
          ]
        ]
      },
      {
        "coord": [
          [
            3,
            7
          ],
          [
            3,
            8
          ],
          [
            4,
            7
          ],
          [
            4,
            8
          ]
        ]
      },
      {
        "coord": [
          [
            1,
            4
          ],
          [
            2,
            4
          ],
          [
            3,
            4
          ]
        ]
      },
      {
        "coord": [
          [
            1,
            5
          ],
          [
            2,
            5
          ],
          [
            3,
            5
          ]
        ]
      },
      {
        "coord": [
          [
            6,
            1
          ],
          [
            6,
            2
          ]
        ]
      },
      {
        "coord": [
          [
            8,
            5
          ],
          [
            8,
            6
          ]
        ]
      },
      {
        "coord": [
          [
            4,
            5
          ],
          [
            5,
            5
          ]
        ]
      },
      {
        "coord": [
          [
            3,
            6
          ],
          [
            4,
            6
          ]
        ]
      }
    ]
  }

const pad = {
    "status": "idle",
    "padStore": [
      {
        "remaining": 0,
        "current": 0
      },
      {
        "remaining": 0,
        "current": 0
      },
      {
        "remaining": 0,
        "current": 0
      },
      {
        "remaining": 0,
        "current": 0
      },
      {
        "remaining": 0,
        "current": 0
      },
      {
        "remaining": 0,
        "current": 0
      }
    ],
    "current": {
      "label": 0,
      "nbHole": 2,
      "orientation": 0,
      "color": "green"
    },
    "droppedCounter": 17
  }