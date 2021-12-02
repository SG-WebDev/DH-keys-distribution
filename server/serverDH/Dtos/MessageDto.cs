using System;
using System.Collections.Generic;

namespace serverDH.Dtos
{
    public class MessageDto
    {
        public string UserName { get; set; }
        public DateTime date { get; set; } = DateTime.Now;
        public string contet { get; set; }

    }

    public interface IMessageRepo
    {
        void AddMess(MessageDto messagedto);
        MessageDto[] GetAllMessage();
    }

    public class MessageRepo : IMessageRepo
    {
        private List<MessageDto> _messagedto = new List<MessageDto>();

        public void AddMess(MessageDto messagedto)
        {
            _messagedto.Add(messagedto);
        }

        public MessageDto[] GetAllMessage()
        {
            return _messagedto.ToArray();
        }
    }
}
