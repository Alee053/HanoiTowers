let N = 5;
let towers = [Array.from({ length: N }, (_, i) => N - i), [], []];
let ans = [];
const x1 = 140,
  x2 = 300,
  x3 = 460;
const X = [140, 300, 460];
const h = 200 / N,
  w = 140;
const y = 500;

let step = -1;

let animRunning = 0;
let animFrame = 0;
let animMax = 15;
let posx = 0,
  posy = 0;
function setup() {
  frameRate(60);
  createCanvas(600, 600);
  textAlign("center");
  textStyle("bold");

  console.log(ans);
  solve(0, 2, 1, N);
  drawTowers();

  let minus = createButton("-");
  let plus = createButton("+");

  plus.mousePressed(() => {
    if (N < 15) {
      N++;
      towers = [Array.from({ length: N }, (_, i) => N - i), [], []];
      ans = [];
      step = -1;
      solve(0, 2, 1, N);
      animRunning = 0;
      animFrame = 0;
    }
  });
  minus.mousePressed(() => {
    if (N > 1) {
      N--;
      towers = [Array.from({ length: N }, (_, i) => N - i), [], []];
      ans = [];
      step = -1;
      solve(0, 2, 1, N);
      animRunning = 0;
      animFrame = 0;
    }
  });
}

function draw() {
  background(50);
  rectMode(CENTER);

  rect(300, 530, 500, 32);
  rect(x1, 401, 50 / N, -225);
  rect(x2, 401, 50 / N, -225);
  rect(x3, 401, 50 / N, -225);
  textSize(25);
  text("Moves: " + (step + 1), 300, 100);
  text("N: " + N, 300, 150);
  textSize(12);

  drawTowers();
  if (step < ans.length - 1 && !animRunning) {
    step++;
    animRunning = 1;
    move(ans[step]);
  }

  if (animRunning) {
    if (animFrame >= animMax) {
      animFrame = 0;
      animRunning = 0;
    } else {
      const x0 = X[ans[step][0]],
        xf = X[ans[step][1]];
      const y0 = y - h * towers[ans[step][0]].length,
        yf = y - h * (towers[ans[step][1]].length - 1);
      let piece = towers[ans[step][1]][towers[ans[step][1]].length - 1];
      fill(100 * (piece / 4.5), 149 * (piece / 4.5), 237 * (piece / 4.5));
      rect(
        x0 +
          ((xf - x0) / (animMax / 3)) *
            (animFrame >= animMax / 3 && animFrame <= (2 * animMax) / 3
              ? animFrame - animMax / 3
              : animFrame < animMax / 3
              ? 0
              : animMax / 3),
        y0 +
          ((150 - y0) / (animMax / 2)) *
            (animFrame < animMax / 2 ? animFrame : animMax / 2) +
          ((yf - 150) / (animMax / 2)) *
            (animFrame >= animMax / 2 ? animFrame - animMax / 2 : 0),
        (w / 1.2) * (piece / N),
        h,
        10,
      );
      fill(255);
      text(
        piece,
        x0 +
          ((xf - x0) / (animMax / 3)) *
            (animFrame >= animMax / 3 && animFrame <= (2 * animMax) / 3
              ? animFrame - animMax / 3
              : animFrame < animMax / 3
              ? 0
              : animMax / 3),
        y0 +
          5 +
          ((150 - y0) / (animMax / 2)) *
            (animFrame < animMax / 2 ? animFrame : animMax / 2) +
          ((yf - 150) / (animMax / 2)) *
            (animFrame >= animMax / 2 ? animFrame - animMax / 2 : 0),
      );
      animFrame++;
    }
  }
}

function drawTowers() {
  let towe = structuredClone(towers);
  if (step >= 0 && step < ans.length - 1) towe[ans[step][1]].pop();

  let num = 0;
  towe[0].forEach((piece) => {
    fill(100 * (piece / 4.5), 149 * (piece / 4.5), 237 * (piece / 4.5));
    rect(x1, y - h * num, (w / 1.2) * (piece / N), h, 10);
    fill(255);
    text(piece, x1, y + 245 - h * num, x1, y);
    num++;
  });
  num = 0;
  towe[1].forEach((piece) => {
    fill(100 * (piece / 4.5), 149 * (piece / 4.5), 237 * (piece / 4.5));
    rect(x2, y - h * num, (w / 1.2) * (piece / N), h, 10);
    fill(255);
    text(piece, x2, y + 245 - h * num, x1, y);
    num++;
  });
  num = 0;
  towe[2].forEach((piece) => {
    fill(100 * (piece / 4.5), 149 * (piece / 4.5), 237 * (piece / 4.5));
    rect(x3, y - h * num, (w / 1.2) * (piece / N), h, 10);
    fill(255);
    text(piece, x3, y + 245 - h * num, x1, y);
    num++;
  });
}

function move(mov) {
  towers[mov[1]].push(towers[mov[0]].pop());
}

function solve(curr, obj, free, x) {
  if (x == 1) {
    ans.push([curr, obj]);
    return;
  }
  solve(curr, free, obj, x - 1);
  ans.push([curr, obj]);
  return solve(free, obj, curr, x - 1);
}
