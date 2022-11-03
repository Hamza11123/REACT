#include <iostream>

#include <conio.h>
#define Board_WIDTH 20
#define Board_HEIGHT 12
using namespace std;

bool gameover;

// const int Board_WIDTH` = 20;
// const int Board_HEIGHT = 14;

int x, y, _Snake_FruitX_COORD, _Snake_FruitY_COORD, score;

int Snake_TailX_COORD[100], Snake_TailY_COORD[100]; // snake coordinates

int nTail;

enum eDirecton
{
  STOP = 0,
  LEFT,
  RIGHT,
  UP,
  DOWN
}; // Controls

eDirecton dir;

void initialization()
{
  gameover = false;

  dir = STOP;

  x = Board_WIDTH / 2;

  y = Board_HEIGHT / 2;

  _Snake_FruitX_COORD = rand() % Board_WIDTH; // display fruit in a random place

  _Snake_FruitY_COORD = rand() % Board_HEIGHT;
  score = 0;
}

void Draw()
{
  system("cls");

  for (int i = 0; i < Board_WIDTH + 2; i++)

    cout << "$";

  cout << endl;

  for (int i = 0; i < Board_HEIGHT; i++)
  {

    for (int j = 0; j < Board_WIDTH; j++)
    {

      if (j == 0)

        cout << "$"; // walls

      if (i == y && j == x)

        cout << "*"; // snake tale

      else if (i == _Snake_FruitY_COORD && j == _Snake_FruitX_COORD)

        cout << "O"; // change it to change the fruit

      else
      {

        bool throwAsciiChars_On_Console = false;

        for (int k = 0; k < nTail; k++)
        {

          if (Snake_TailX_COORD[k] == j && Snake_TailY_COORD[k] == i)
          {

            cout << "*";
            throwAsciiChars_On_Console = true;
          }
        }

        if (!throwAsciiChars_On_Console)
          cout << " ";
      }

      if (j == Board_WIDTH - 1)

        cout << '$';
    }

    cout << endl;
  }

  for (int i = 0; i < Board_WIDTH + 2; i++)

    cout << '$';

  cout << endl;

  cout << "Score:" << score << endl;
}

void Input()
{

  if (_kbhit())
  {

    switch (_getch())
    {

    case 'a':

      dir = LEFT;

      break;

    case 'd':

      dir = RIGHT;

      break;

    case 'w':

      dir = UP;

      break;

    case 's':

      dir = DOWN;

      break;

    case 'x':

      gameover = true;

      break;
    }
  }
}

void algorithm()
{

  int prevX = Snake_TailX_COORD[0];

  int prevY = Snake_TailY_COORD[0];

  int prev2X, prev2Y;

  Snake_TailX_COORD[0] = x;

  Snake_TailY_COORD[0] = y;

  for (int i = 1; i < nTail; i++)
  {

    prev2X = Snake_TailX_COORD[i];

    prev2Y = Snake_TailY_COORD[i];

    Snake_TailX_COORD[i] = prevX;

    Snake_TailY_COORD[i] = prevY;

    prevX = prev2X;

    prevY = prev2Y;
  }

  switch (dir)
  {

  case LEFT:

    x--;

    break;

  case RIGHT:

    x++;

    break;

  case UP:

    y--;

    break;

  case DOWN:

    y++;

    break;

  default:

    break;
  }

  if (x >= Board_WIDTH)
    x = 0;
  else if (x < 0)
    x = Board_WIDTH - 1;

  if (y >= Board_HEIGHT)
    y = 0;
  else if (y < 0)
    y = Board_HEIGHT - 1;

  for (int i = 0; i < nTail; i++)

    if (Snake_TailX_COORD[i] == x && Snake_TailY_COORD[i] == y)
      gameover = true;

  if (x == _Snake_FruitX_COORD && y == _Snake_FruitY_COORD)
  {

    score += 10;

    _Snake_FruitX_COORD = rand() % Board_WIDTH;

    _Snake_FruitY_COORD = rand() % Board_HEIGHT;

    nTail++;
  }
}

int main()
{

  initialization();

  while (!gameover)
  {

    Draw();

    Input();

    algorithm();
  }

  return 0;
}