using System;

namespace serverDH.Entities
{
    public class Message
    {
        public int messageId { get; set; }
        public DateTime When { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }

        public virtual User user { get; set; }
    }
}
