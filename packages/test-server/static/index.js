const socket = io();
socket.emit('subscribeToEntity', { entityId: '5d74ddc26a1f88bc5a5c234a' });
socket.emit('subscribeToEntity', { entityId: '5d752827417cd516d817cf0b' });

socket.on('entityChanged', message => {
  console.log(message.entity.fullDocument.message);
});
