// gesture-handler.js
AFRAME.registerComponent("gesture-handler", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 5 },
      minScale: { default: 0.3 },
      maxScale: { default: 8 },
    },
  
    init: function () {
      this.handleScale = this.handleScale.bind(this);
      this.handleRotation = this.handleRotation.bind(this);
  
      this.isVisible = false;
      this.initialScale = this.el.object3D.scale.clone();
      this.scaleFactor = 1;
  
      this.el.sceneEl.addEventListener("markerFound", (e) => {
        this.isVisible = true;
      });
  
      this.el.sceneEl.addEventListener("markerLost", (e) => {
        this.isVisible = false;
      });
    },
  
    update: function () {
      if (this.data.enabled) {
        this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
      } else {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      }
    },
  
    remove: function () {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    },
  
  handleRotation: function (event) {
 if (this.isVisible) {
    // 新しい回転値を計算
    var newYRotation = this.el.object3D.rotation.y + event.detail.positionChange.x * this.data.rotationFactor;
    var newZRotation = this.el.object3D.rotation.z + event.detail.positionChange.y * this.data.rotationFactor; // Z軸の回転に変更

    // Y軸の回転を-π/9からπ/9（-20度から20度）の範囲に制限
    if (newYRotation > Math.PI/9) newYRotation = Math.PI/9;
    else if (newYRotation < -Math.PI/9) newYRotation = -Math.PI/9;

    // Z軸の回転を-π/9からπ/9（-20度から20度）の範囲に制限
    if (newZRotation > Math.PI/9) newZRotation = Math.PI/9;
    else if (newZRotation < -Math.PI/9) newZRotation = -Math.PI/9;

    // 回転を適用
    this.el.object3D.rotation.y = newYRotation;
    this.el.object3D.rotation.z = newZRotation; // Z軸の適用
  }
},
    
    handleScale: function (event) {
      if (this.isVisible) {
        this.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        this.scaleFactor = Math.min(
          Math.max(this.scaleFactor, this.data.minScale),
          this.data.maxScale
        );
  
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
      }
    },
  });
