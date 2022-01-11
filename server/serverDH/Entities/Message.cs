using System;

namespace serverDH.Entities
{
    public class Message
    {
        public int messageId { get; set; }
        public DateTime date { get; set; }
        public string message { get; set; }
        public string UserName { get; set; }

    }
}
