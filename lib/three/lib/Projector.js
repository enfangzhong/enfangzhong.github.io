/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author julianwa / https://github.com/julianwa
 */

THREE.RenderableObject = function () {

	this.id = 0;

	this.object = null;
	this.z = 0;
	this.renderOrder = 0;

};

//

THREE.RenderableFace = function () {

	this.id = 0;

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();
	this.v3 = new THREE.RenderableVertex();

	this.normalModel = new THREE.Vector3();

	this.vertexNormalsModel = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	this.vertexNormalsLength = 0;

	this.color = new THREE.Color();
	this.material = null;
	this.uvs = [ new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2() ];

	this.z = 0;
	this.renderOrder = 0;

};

//

THREE.RenderableVertex = function () {

	this.position = new THREE.Vector3();
	this.positionWorld = new THREE.Vector3();
	this.positionScreen = new THREE.Vector4();

	this.visible = true;

};

THREE.RenderableVertex.prototype.copy = function ( vertex ) {

	this.positionWorld.copy( vertex.positionWorld );
	this.positionScreen.copy( vertex.positionScreen );

};

//

THREE.RenderableLine = function () {

	this.id = 0;

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();

	this.vertexColors = [ new THREE.Color(), new THREE.Color() ];
	this.material = null;

	this.z = 0;
	this.renderOrder = 0;

};

//

THREE.RenderableSprite = function () {

	this.id = 0;

	this.object = null;

	this.x = 0;
	this.y = 0;
	this.z = 0;

	this.rotation = 0;
	this.scale = new THREE.Vector2();

	this.material = null;
	this.renderOrder = 0;

};

//

THREE.Projector = function () {

	var _object, _objectCount, _objectPool = [], _objectPoolLength = 0,
	_vertex, _vertexCount, _vertexPool = [], _vertexPoolLength = 0,
	_face, _faceCount, _facePool = [], _facePoolLength = 0,
	_line, _lineCount, _linePool = [], _linePoolLength = 0,
	_sprite, _spriteCount, _spritePool = [], _spritePoolLength = 0,

	_renderData = { objects: [], lights: [], elements: [] },

	_vector3 = new THREE.Vector3(),
	_vector4 = new THREE.Vector4(),

	_clipBox = new THREE.Box3( new THREE.Vector3( - 1, - 1, - 1 ), new THREE.Vector3( 1, 1, 1 ) ),
	_boundingBox = new THREE.Box3(),
	_points3 = new Array( 3 ),
	_points4 = new Array( 4 ),

	_viewMatrix = new THREE.Matrix4(),
	_viewProjectionMatrix = new THREE.Matrix4(),

	_modelMatrix,
	_modelViewProjectionMatrix = new THREE.Matrix4(),

	_normalMatrix = new THREE.Matrix3(),

	_frustum = new THREE.Frustum(),

	_clippedVertex1PositionScreen = new THREE.Vector4(),
	_clippedVertex2PositionScreen = new THREE.Vector4();

	//

	this.projectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .projectVector() is now vector.project().' );
		vector.project( camera );

	};

	this.unprojectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .unprojectVector() is now vector.unproject().' );
		vector.unproject( camera );

	};

	this.pickingRay = function ( vector, camera ) {

		console.error( 'THREE.Projector: .pickingRay() is now raycaster.setFromCamera().' );

	};

	//

	var RenderList = function () {

		var normals = [];
		var uvs = [];

		var object = null;
		var material = null;

		var normalMatrix = new THREE.Matrix3();

		function setObject( value ) {

			object = value;
			material = object.material;

			normalMatrix.getNormalMatrix( object.matrixWorld );

			normals.length = 0;
			uvs.length = 0;

		}

		function projectVertex( vertex ) {

			var position = vertex.position;
			var positionWorld = vertex.positionWorld;
			var positionScreen = vertex.positionScreen;

			positionWorld.copy( position ).applyMatrix4( _modelMatrix );
			positionScreen.copy( positionWorld ).applyMatrix4( _viewProjectionMatrix );

			var invW = 1 / positionScreen.w;

			positionScreen.x *= invW;
			positionScreen.y *= invW;
			positionScreen.z *= invW;

			vertex.visible = positionScreen.x >= - 1 && positionScreen.x <= 1="" &&="" positionscreen.y="">= - 1 && positionScreen.y <= 1="" &&="" positionscreen.z="">= - 1 && positionScreen.z <= 0="" 1="" 2="" 3="" 1;="" }="" function="" pushvertex(="" x,="" y,="" z="" )="" {="" _vertex="getNextVertexInPool();" _vertex.position.set(="" );="" projectvertex(="" pushnormal(="" normals.push(="" pushuv(="" y="" uvs.push(="" checktrianglevisibility(="" v1,="" v2,="" v3="" if="" (="" v1.visible="==" true="" ||="" v2.visible="==" v3.visible="==" return="" true;="" _points3[="" ]="v1.positionScreen;" _clipbox.intersectsbox(="" _boundingbox.setfrompoints(="" _points3="" checkbackfaceculling(="" v3.positionscreen.x="" -="" v1.positionscreen.x="" *="" v2.positionscreen.y="" v1.positionscreen.y="" v3.positionscreen.y="" v2.positionscreen.x="" <="" 0;="" pushline(="" a,="" b="" var="" v1="_vertexPool[" a="" ];="" v2="_vertexPool[" _line="getNextLineInPool();" _line.id="object.id;" _line.v1.copy(="" _line.v2.copy(="" _line.z="(" v1.positionscreen.z="" +="" v2.positionscreen.z="" 2;="" _line.renderorder="object.renderOrder;" _line.material="object.material;" _renderdata.elements.push(="" pushtriangle(="" b,="" c="" false="" return;="" material.side="==" three.doubleside="" _face="getNextFaceInPool();" _face.id="object.id;" _face.v1.copy(="" _face.v2.copy(="" _face.v3.copy(="" _face.z="(" v3.positionscreen.z="" 3;="" _face.renderorder="object.renderOrder;" use="" first="" vertex="" normal="" as="" face="" _face.normalmodel.fromarray(="" normals,="" _face.normalmodel.applymatrix3(="" normalmatrix="" ).normalize();="" for="" i="0;" ++="" normal.fromarray(="" arguments[="" normal.applymatrix3(="" uv="_face.uvs[" uv.fromarray(="" uvs,="" _face.vertexnormalslength="3;" _face.material="object.material;" setobject:="" setobject,="" projectvertex:="" projectvertex,="" checktrianglevisibility:="" checktrianglevisibility,="" checkbackfaceculling:="" checkbackfaceculling,="" pushvertex:="" pushvertex,="" pushnormal:="" pushnormal,="" pushuv:="" pushuv,="" pushline:="" pushline,="" pushtriangle:="" pushtriangle="" };="" renderlist="new" renderlist();="" this.projectscene="function" scene,="" camera,="" sortobjects,="" sortelements="" _facecount="0;" _linecount="0;" _spritecount="0;" _renderdata.elements.length="0;" scene.autoupdate="==" scene.updatematrixworld();="" camera.parent="==" null="" camera.updatematrixworld();="" _viewmatrix.copy(="" camera.matrixworldinverse.getinverse(="" camera.matrixworld="" _viewprojectionmatrix.multiplymatrices(="" camera.projectionmatrix,="" _viewmatrix="" _frustum.setfrommatrix(="" _viewprojectionmatrix="" _objectcount="0;" _renderdata.objects.length="0;" _renderdata.lights.length="0;" addobject(="" object="" _object="getNextObjectInPool();" _object.id="object.id;" _object.object="object;" _vector3.setfrommatrixposition(="" object.matrixworld="" _vector3.applymatrix4(="" _object.z="_vector3.z;" _object.renderorder="object.renderOrder;" _renderdata.objects.push(="" scene.traversevisible(="" instanceof="" three.light="" _renderdata.lights.push(="" else="" three.mesh="" three.line="" object.material.visible="==" object.frustumculled="==" &&="" _frustum.intersectsobject(="" three.sprite="" _frustum.intersectssprite(="" sortobjects="==" _renderdata.objects.sort(="" paintersort="" o="0," ol="_renderData.objects.length;" ol;="" ].object;="" geometry="object.geometry;" renderlist.setobject(="" _modelmatrix="object.matrixWorld;" _vertexcount="0;" three.buffergeometry="" attributes="geometry.attributes;" groups="geometry.groups;" attributes.position="==" undefined="" continue;="" positions="attributes.position.array;" l="positions.length;" l;="" renderlist.pushvertex(="" positions[="" ],="" attributes.normal="" !="=" normals="attributes.normal.array;" renderlist.pushnormal(="" normals[="" attributes.uv="" uvs="attributes.uv.array;" renderlist.pushuv(="" uvs[="" geometry.index="" indices="geometry.index.array;" groups.length=""> 0 ) {

							for ( var g = 0; g < groups.length; g ++ ) {

								var group = groups[ g ];

								for ( var i = group.start, l = group.start + group.count; i < l; i += 3 ) {

									renderList.pushTriangle( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

								}

							}

						} else {

							for ( var i = 0, l = indices.length; i < l; i += 3 ) {

								renderList.pushTriangle( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

							}

						}

					} else {

						for ( var i = 0, l = positions.length / 3; i < l; i += 3 ) {

							renderList.pushTriangle( i, i + 1, i + 2 );

						}

					}

				} else if ( geometry instanceof THREE.Geometry ) {

					var vertices = geometry.vertices;
					var faces = geometry.faces;
					var faceVertexUvs = geometry.faceVertexUvs[ 0 ];

					_normalMatrix.getNormalMatrix( _modelMatrix );

					var material = object.material;

					var isFaceMaterial = material instanceof THREE.MultiMaterial;
					var objectMaterials = isFaceMaterial === true ? object.material : null;

					for ( var v = 0, vl = vertices.length; v < vl; v ++ ) {

						var vertex = vertices[ v ];

						_vector3.copy( vertex );

						if ( material.morphTargets === true ) {

							var morphTargets = geometry.morphTargets;
							var morphInfluences = object.morphTargetInfluences;

							for ( var t = 0, tl = morphTargets.length; t < tl; t ++ ) {

								var influence = morphInfluences[ t ];

								if ( influence === 0 ) continue;

								var target = morphTargets[ t ];
								var targetVertex = target.vertices[ v ];

								_vector3.x += ( targetVertex.x - vertex.x ) * influence;
								_vector3.y += ( targetVertex.y - vertex.y ) * influence;
								_vector3.z += ( targetVertex.z - vertex.z ) * influence;

							}

						}

						renderList.pushVertex( _vector3.x, _vector3.y, _vector3.z );

					}

					for ( var f = 0, fl = faces.length; f < fl; f ++ ) {

						var face = faces[ f ];

						material = isFaceMaterial === true
							 ? objectMaterials.materials[ face.materialIndex ]
							 : object.material;

						if ( material === undefined ) continue;

						var side = material.side;

						var v1 = _vertexPool[ face.a ];
						var v2 = _vertexPool[ face.b ];
						var v3 = _vertexPool[ face.c ];

						if ( renderList.checkTriangleVisibility( v1, v2, v3 ) === false ) continue;

						var visible = renderList.checkBackfaceCulling( v1, v2, v3 );

						if ( side !== THREE.DoubleSide ) {

							if ( side === THREE.FrontSide && visible === false ) continue;
							if ( side === THREE.BackSide && visible === true ) continue;

						}

						_face = getNextFaceInPool();

						_face.id = object.id;
						_face.v1.copy( v1 );
						_face.v2.copy( v2 );
						_face.v3.copy( v3 );

						_face.normalModel.copy( face.normal );

						if ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) {

							_face.normalModel.negate();

						}

						_face.normalModel.applyMatrix3( _normalMatrix ).normalize();

						var faceVertexNormals = face.vertexNormals;

						for ( var n = 0, nl = Math.min( faceVertexNormals.length, 3 ); n < nl; n ++ ) {

							var normalModel = _face.vertexNormalsModel[ n ];
							normalModel.copy( faceVertexNormals[ n ] );

							if ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) {

								normalModel.negate();

							}

							normalModel.applyMatrix3( _normalMatrix ).normalize();

						}

						_face.vertexNormalsLength = faceVertexNormals.length;

						var vertexUvs = faceVertexUvs[ f ];

						if ( vertexUvs !== undefined ) {

							for ( var u = 0; u < 3; u ++ ) {

								_face.uvs[ u ].copy( vertexUvs[ u ] );

							}

						}

						_face.color = face.color;
						_face.material = material;

						_face.z = ( v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z ) / 3;
						_face.renderOrder = object.renderOrder;

						_renderData.elements.push( _face );

					}

				}

			} else if ( object instanceof THREE.Line ) {

				if ( geometry instanceof THREE.BufferGeometry ) {

					var attributes = geometry.attributes;

					if ( attributes.position !== undefined ) {

						var positions = attributes.position.array;

						for ( var i = 0, l = positions.length; i < l; i += 3 ) {

							renderList.pushVertex( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );

						}

						if ( geometry.index !== null ) {

							var indices = geometry.index.array;

							for ( var i = 0, l = indices.length; i < l; i += 2 ) {

								renderList.pushLine( indices[ i ], indices[ i + 1 ] );

							}

						} else {

							var step = object instanceof THREE.LineSegments ? 2 : 1;

							for ( var i = 0, l = ( positions.length / 3 ) - 1; i < l; i += step ) {

								renderList.pushLine( i, i + 1 );

							}

						}

					}

				} else if ( geometry instanceof THREE.Geometry ) {

					_modelViewProjectionMatrix.multiplyMatrices( _viewProjectionMatrix, _modelMatrix );

					var vertices = object.geometry.vertices;

					if ( vertices.length === 0 ) continue;

					v1 = getNextVertexInPool();
					v1.positionScreen.copy( vertices[ 0 ] ).applyMatrix4( _modelViewProjectionMatrix );

					var step = object instanceof THREE.LineSegments ? 2 : 1;

					for ( var v = 1, vl = vertices.length; v < vl; v ++ ) {

						v1 = getNextVertexInPool();
						v1.positionScreen.copy( vertices[ v ] ).applyMatrix4( _modelViewProjectionMatrix );

						if ( ( v + 1 ) % step > 0 ) continue;

						v2 = _vertexPool[ _vertexCount - 2 ];

						_clippedVertex1PositionScreen.copy( v1.positionScreen );
						_clippedVertex2PositionScreen.copy( v2.positionScreen );

						if ( clipLine( _clippedVertex1PositionScreen, _clippedVertex2PositionScreen ) === true ) {

							// Perform the perspective divide
							_clippedVertex1PositionScreen.multiplyScalar( 1 / _clippedVertex1PositionScreen.w );
							_clippedVertex2PositionScreen.multiplyScalar( 1 / _clippedVertex2PositionScreen.w );

							_line = getNextLineInPool();

							_line.id = object.id;
							_line.v1.positionScreen.copy( _clippedVertex1PositionScreen );
							_line.v2.positionScreen.copy( _clippedVertex2PositionScreen );

							_line.z = Math.max( _clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z );
							_line.renderOrder = object.renderOrder;

							_line.material = object.material;

							if ( object.material.vertexColors === THREE.VertexColors ) {

								_line.vertexColors[ 0 ].copy( object.geometry.colors[ v ] );
								_line.vertexColors[ 1 ].copy( object.geometry.colors[ v - 1 ] );

							}

							_renderData.elements.push( _line );

						}

					}

				}

			} else if ( object instanceof THREE.Sprite ) {

				_vector4.set( _modelMatrix.elements[ 12 ], _modelMatrix.elements[ 13 ], _modelMatrix.elements[ 14 ], 1 );
				_vector4.applyMatrix4( _viewProjectionMatrix );

				var invW = 1 / _vector4.w;

				_vector4.z *= invW;

				if ( _vector4.z >= - 1 && _vector4.z <= 0="" 1="" 5="" 12="" 13="" )="" {="" _sprite="getNextSpriteInPool();" _sprite.id="object.id;" _sprite.x="_vector4.x" *="" invw;="" _sprite.y="_vector4.y" _sprite.z="_vector4.z;" _sprite.renderorder="object.renderOrder;" _sprite.object="object;" _sprite.rotation="object.rotation;" _sprite.scale.x="object.scale.x" math.abs(="" -="" (="" _vector4.x="" +="" camera.projectionmatrix.elements[="" ]="" _vector4.w="" );="" _sprite.scale.y="object.scale.y" _vector4.y="" _sprite.material="object.material;" _renderdata.elements.push(="" }="" if="" sortelements="==" true="" _renderdata.elements.sort(="" paintersort="" return="" _renderdata;="" };="" pools="" function="" getnextobjectinpool()="" _objectcount="==" _objectpoollength="" var="" object="new" three.renderableobject();="" _objectpool.push(="" ++;="" object;="" _objectpool[="" ++="" ];="" getnextvertexinpool()="" _vertexcount="==" _vertexpoollength="" vertex="new" three.renderablevertex();="" _vertexpool.push(="" vertex;="" _vertexpool[="" getnextfaceinpool()="" _facecount="==" _facepoollength="" face="new" three.renderableface();="" _facepool.push(="" face;="" _facepool[="" getnextlineinpool()="" _linecount="==" _linepoollength="" line="new" three.renderableline();="" _linepool.push(="" line;="" _linepool[="" getnextspriteinpool()="" _spritecount="==" _spritepoollength="" sprite="new" three.renderablesprite();="" _spritepool.push(="" sprite;="" _spritepool[="" paintersort(="" a,="" b="" a.renderorder="" !="=" b.renderorder="" b.renderorder;="" else="" a.z="" b.z="" a.z;="" a.id="" b.id="" b.id;="" 0;="" clipline(="" s1,="" s2="" alpha1="0," alpha2="1," calculate="" the="" boundary="" coordinate="" of="" each="" for="" near="" and="" far="" clip="" planes,="" z="-1" respectively.="" bc1near="s1.z" s1.w,="" bc2near="s2.z" s2.w,="" bc1far="-" s1.z="" bc2far="-" s2.z="" s2.w;="">= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0 ) {

			// Both vertices lie entirely within all clip planes.
			return true;

		} else if ( ( bc1near < 0 && bc2near < 0 ) || ( bc1far < 0 && bc2far < 0 ) ) {

			// Both vertices lie entirely outside one of the clip planes.
			return false;

		} else {

			// The line segment spans at least one clip plane.

			if ( bc1near < 0 ) {

				// v1 lies outside the near plane, v2 inside
				alpha1 = Math.max( alpha1, bc1near / ( bc1near - bc2near ) );

			} else if ( bc2near < 0 ) {

				// v2 lies outside the near plane, v1 inside
				alpha2 = Math.min( alpha2, bc1near / ( bc1near - bc2near ) );

			}

			if ( bc1far < 0 ) {

				// v1 lies outside the far plane, v2 inside
				alpha1 = Math.max( alpha1, bc1far / ( bc1far - bc2far ) );

			} else if ( bc2far < 0 ) {

				// v2 lies outside the far plane, v2 inside
				alpha2 = Math.min( alpha2, bc1far / ( bc1far - bc2far ) );

			}

			if ( alpha2 < alpha1 ) {

				// The line segment spans two boundaries, but is outside both of them.
				// (This can't happen when we're only clipping against just near/far but good
				//  to leave the check here for future usage if other clip planes are added.)
				return false;

			} else {

				// Update the s1 and s2 vertices to match the clipped line segment.
				s1.lerp( s2, alpha1 );
				s2.lerp( s1, 1 - alpha2 );

				return true;

			}

		}

	}

};
</=></=></=></=>