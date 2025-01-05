import { GraphNode } from "./GraphScreen";

export const getNodeSize = (trustScore: number) => {
  return trustScore * 0.5;
};

export const drawDefaultNode = (
  node: GraphNode,
  ctx: CanvasRenderingContext2D
) => {
  const nodeSize = getNodeSize(node.trustScore);
  ctx.beginPath();
  ctx.arc(node.x || 0, node.y || 0, nodeSize, 0, 2 * Math.PI);
  ctx.fillStyle = "#001A6E";
  ctx.fill();
};

export const addYellowBorder = (
  node: GraphNode,
  nodeSize: number,
  ctx: CanvasRenderingContext2D
) => {
  ctx.beginPath();
  ctx.arc(node.x || 0, node.y || 0, nodeSize, 0, 2 * Math.PI);
  ctx.strokeStyle = "#FFC145";
  ctx.lineWidth = 4;
  ctx.stroke();
};

export const drawImageNode = (
  node: GraphNode,
  ctx: CanvasRenderingContext2D,
  nodeSize: number,
  imageCache: Map<string, HTMLImageElement>
) => {
  const img = imageCache.get(node.profilePictureUrl!)!;

  ctx.save();
  ctx.beginPath();
  ctx.arc(node.x || 0, node.y || 0, nodeSize, 0, 2 * Math.PI);
  ctx.clip();

  const imgAspectRatio = img.width / img.height;
  const nodeAspectRatio = 1;

  let drawWidth = nodeSize * 2;
  let drawHeight = nodeSize * 2;

  if (imgAspectRatio > nodeAspectRatio) {
    drawWidth = (nodeSize * 2 * imgAspectRatio) / nodeAspectRatio;
    drawHeight = nodeSize * 2;
  } else {
    drawWidth = nodeSize * 2;
    drawHeight = (nodeSize * 2 * nodeAspectRatio) / imgAspectRatio;
  }

  const drawX = (node.x || 0) - drawWidth / 2;
  const drawY = (node.y || 0) - drawHeight / 2;

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  ctx.restore();
};
