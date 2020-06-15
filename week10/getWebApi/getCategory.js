var treeStr = document.querySelector('.titlebar-container .title').innerText;
var wikiArticle = document.querySelector('#wikiArticle');
var resolveStr = {
  Syntax: '',
  Properties: '',
  Constructor: '',
  Constructors: '',
  Constants: '',
  Methods: '',
  methods: '',
  Events: '',
  Pointer_event_types: '',
  GlobalEventHandlers: '',
  Static_properties: '',
  Static_methods: '',
  Instance_properties: '',
  Instance_methods: '',
  The_WebGL_context: '',
  Viewing_and_clipping: '',
  State_information: '',
  Buffers: '',
  Framebuffers: '',
  Renderbuffers: '',
  Textures: '',
  Programs_and_shaders: '',
  Uniforms_and_attributes: '',
  Drawing_buffers: '',
  Working_with_extensions: '',
  Query_objects: '',
  Sampler_objects: '',
  Sync_objects: '',
  Transform_feedback: '',
  Uniform_buffer_objects: '',
  Vertex_array_objects: '',
};
var attrs = {
  Syntax: true,
  Properties: true,
  Constructor: true,
  Constructors: true,
  Constants: true,
  Methods: true,
  methods: true,
  Events: true,
  Pointer_event_types: true,
  GlobalEventHandlers: true,
  Static_properties: true,
  Static_methods: true,
  Instance_properties: true,
  Instance_methods: true,
  The_WebGL_context: true,
  Viewing_and_clipping: true,
  State_information: true,
  Buffers: true,
  Framebuffers: true,
  Renderbuffers: true,
  Textures: true,
  Programs_and_shaders: true,
  Uniforms_and_attributes: true,
  Drawing_buffers: true,
  Working_with_extensions: true,
  Query_objects: true,
  Sampler_objects: true,
  Sync_objects: true,
  Transform_feedback: true,
  Uniform_buffer_objects: true,
  Vertex_array_objects: true,
};

function buildResolveStr(wikiArticle) {
  let index = 0;
  let resolveTitle = true;
  let resolveAttr = '';
  let lastResolveAttr = '';

  while (index < wikiArticle.children.length) {
    var ele = wikiArticle.children[index];
    const tagName = ele.tagName.toLowerCase();
    const attr = ele.getAttribute('id');

    if (
      (tagName === 'div' || tagName === 'dl') &&
      !ele.getAttribute('id') &&
      ele.children.length &&
      !ele.getAttribute('class')
    ) {
      buildResolveStr(ele);
    }

    if (resolveTitle && tagName === 'p') {
      // treeStr += '\\n\\t\\t' + ele.innerText;
    }

    if (tagName === 'h2') {
      if (attrs[attr]) {
        resolveTitle = false;
        resolveAttr = attr;
        lastResolveAttr = '';
        resolveStr[attr] = '\\n\\t' + ele.innerText;
      } else {
        resolveAttr = '';
        lastResolveAttr = '';
      }
    }

    if (tagName === 'h3') {
      if (resolveAttr && resolveAttr === 'Syntax' && attr === 'Parameters') {
        resolveStr[resolveAttr] += '\\n\\t\\t' + ele.innerText;
      }
      console.log(lastResolveAttr);
      if (lastResolveAttr) {
        resolveStr[lastResolveAttr] += '\\n\\t\\t' + ele.innerText;
      }
      if (resolveAttr === 'Constants') {
        resolveStr[resolveAttr] += '\\n\\t\\t' + ele.innerText;
      }
    }

    if (tagName === 'p') {
      if (lastResolveAttr) {
        // resolveStr[lastResolveAttr] += '\\n\\t\\t\\t' + ele.innerText;
      }
    }

    if (tagName === 'table') {
      if (resolveAttr === 'Constants') {
        Array.from(ele.children).forEach((child) => {
          if (child.tagName.toLowerCase() === 'tbody') {
            Array.from(child.children).forEach((tr, i) => {
              if (i) {
                resolveStr[resolveAttr] += '\\n\\t\\t' + tr.children[0].innerText;
              }
            });
          }
        });
      }
    }

    if (tagName === 'dl') {
      if (lastResolveAttr) {
        Array.from(ele.children).forEach((child) => {
          if (child.tagName.toLowerCase() === 'dt') {
            if (child.children) {
              Array.from(child.children).forEach((c, i) => {
                if (!i) {
                  resolveStr[lastResolveAttr] += '\\n\\t\\t\\t' + c.innerText;
                } else {
                  // if (c.innerText) {
                  //   resolveStr[lastResolveAttr] += '\\n\\t\\t\\t\\t' + ele.innerText;
                  // }
                }
              });
            } else {
              resolveStr[lastResolveAttr] += '\\n\\t\\t\\t' + child.innerText;
            }
          } else {
            // if (child.innerText.match('\\n\\n')) {
            //   resolveStr[lastResolveAttr] += '\\n\\t\\t\\t\\t' + child.innerText.replace(
            //     '\\n\\n',
            //     '\\n\\t\\t\\t\\t',
            //   );
            // } else if (child.innerText.match('\\n')) {
            //   resolveStr[lastResolveAttr] += '\\n\\t\\t\\t\\t' + child.innerText.replace(
            //     '\\n',
            //     '\\n\\t\\t\\t\\t',
            //   );
            // } else {
            //   resolveStr[lastResolveAttr] += '\\n\\t\\t\\t\\t' + child.innerText;
            // }
          }
        });
      }

      if (resolveAttr) {
        if (resolveStr[resolveAttr].endsWith('Parameters')) {
          Array.from(ele.children).forEach((child) => {
            if (child.tagName.toLowerCase() === 'dt') {
              if (child.children) {
                Array.from(child.children).forEach((c, i) => {
                  if (!i) {
                    resolveStr[resolveAttr] += '\\n\\t\\t\\t' + c.innerText;
                  } else {
                    if (c.innerText) {
                      // resolveStr[resolveAttr] += '\\n\\t\\t\\t' + c.innerText;
                    }
                  }
                });
              }
            }
          });
          resolveAttr = '';
        } else {
          Array.from(ele.children).forEach((child) => {
            if (child.tagName.toLowerCase() === 'dt') {
              if (child.children) {
                Array.from(child.children).forEach((c, i) => {
                  if (!i) {
                    resolveStr[resolveAttr] += '\\n\\t\\t' + c.innerText;
                  } else {
                    if (c.innerText) {
                      // resolveStr[resolveAttr] += '\\n\\t\\t\\t' + c.innerText;
                    }
                  }
                });
              } else {
                // resolveStr[resolveAttr] += '\\n\\t\\t' + child.innerText;
              }
            } else {
              // if (child.innerText.match('\\n\\n')) {
              //   resolveStr[resolveAttr] += '\\n\\t\\t\\t' + child.innerText.replace(
              //     '\\n\\n',
              //     '\\n\\t\\t\\t',
              //   );
              // } else if (child.innerText.match('\\n')) {
              //   resolveStr[resolveAttr] += '\\n\\t\\t\\t' + child.innerText.replace(
              //     '\\n',
              //     '\\n\\t\\t\\t',
              //   );
              // } else {
              //   resolveStr[resolveAttr] += '\\n\\t\\t\\t' + child.innerText;
              // }
            }
          });
        }
        lastResolveAttr = resolveAttr;
        resolveAttr = '';
      }
    }

    index++;
  }
}

buildResolveStr(wikiArticle);

treeStr += resolveStr.Syntax;
treeStr += resolveStr.Constructor;
treeStr += resolveStr.Constructors;
treeStr += resolveStr.Constants;
treeStr += resolveStr.Properties;
treeStr += resolveStr.Methods;
treeStr += resolveStr.methods;
treeStr += resolveStr.Events;
treeStr += resolveStr.Pointer_event_types;
treeStr += resolveStr.GlobalEventHandlers;
treeStr += resolveStr.Static_properties;
treeStr += resolveStr.Static_methods;
treeStr += resolveStr.Instance_properties;
treeStr += resolveStr.Instance_methods;
treeStr += resolveStr.The_WebGL_context;
treeStr += resolveStr.Viewing_and_clipping;
treeStr += resolveStr.State_information;
treeStr += resolveStr.Buffers;
treeStr += resolveStr.Framebuffers;
treeStr += resolveStr.Renderbuffers;
treeStr += resolveStr.Textures;
treeStr += resolveStr.Programs_and_shaders;
treeStr += resolveStr.Uniforms_and_attributes;
treeStr += resolveStr.Drawing_buffers;
treeStr += resolveStr.Working_with_extensions;
treeStr += resolveStr.Query_objects;
treeStr += resolveStr.Sampler_objects;
treeStr += resolveStr.Sync_objects;
treeStr += resolveStr.Transform_feedback;
treeStr += resolveStr.Uniform_buffer_objects;
treeStr += resolveStr.Vertex_array_objects;

treeStr += '\\n\\tSpecifications';

if (
  document.querySelector('#Specifications') ||
  document.querySelector('#Specification')
) {
  Array.from(
    (
      document.querySelector('#Specifications') ||
      document.querySelector('#Specification')
    ).nextElementSibling.querySelectorAll('tbody tr'),
  ).forEach((ele, index) => {
    Array.from(ele.children).forEach((ele, index) => {
      if (index === 0) {
        if (ele.innerText !== 'Specification') {
          treeStr += '\\n\\t\\t' + ele.innerText.replace('\\n', '\\n\\t\\t\\t');
        }
      } else if (index === 1) {
        if (ele.innerText !== 'Status') {
          // treeStr += '\\n\\t\\t\\t\\t' + ele.innerText.replace('\\n', '\\t');
        }
      } else {
        if (ele.innerText !== 'Comment') {
          // treeStr += \\n\\t\\t\\t\\t\\t + ele.innerText.replace(/\\n/g, '\\t');
        }
      }
    });
  });
}

console.log(treeStr);
copy(treeStr);
// window.close()
