function mxWfRect(bounds, fill, stroke, strokewidth)
{
  mxRectangleShape.call(this);
  this.bounds = bounds;
  this.fill = fill;
  this.stroke = stroke;
  this.strokewidth = (strokewidth != null) ? strokewidth : 1;
};

mxUtils.extend(mxWfRect, mxRectangleShape);
mxWfRect.prototype.paintBackground = function(c, x, y, w, h)
{
  mxRectangleShape.prototype.paintBackground.apply(this, arguments);
};

mxWfRect.prototype.paintForeground = function(c, x, y, w, h)
{
  mxRectangleShape.prototype.paintForeground.apply(this, arguments);
};

mxCellRenderer.registerShape('wfRect', mxWfRect);
