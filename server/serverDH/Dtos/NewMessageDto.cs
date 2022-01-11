using System;

namespace serverDH.Dtos
{
    public class NewMessageDto
    {
        public string username { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; } = DateTime.Now;
    }
}
