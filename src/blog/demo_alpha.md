--- 
layout: article
title: Lina demo page (alpha)
date: 2024-01-12
category: "demo" 
---
All audio prompt and text condition are unseen and come from test-clean split of LibriTTS. Using [EnCodec](https://github.com/facebookresearch/encodec) "tokenizer" at bitrate 3kb/s with [Vocos](https://github.com/gemelo-ai/vocos) vocoder. The whole model is 60M parameters.
# Zero-shot voice cloning using audio prompt.

<table>
    <tr>
    <th>speaker ID</th>
    <th>text</th>
    <th>prompt</th>
    <th>Lina</th>
    </tr>
{% for row in metadata_alpha %}
    <tr style="border-bottom: 1px solid #000;">
        <td>{{ row.speaker_prompt }}  </td>
        <td>  {{ row.text_target }}</td>
        <td><audio controls=""><source src="/assets/demo_alpha/{{ row.row_nr }}_prompt.wav" type="audio/x-wav"></audio></td>
        <td><audio controls><source src="/assets/demo_alpha/{{ row.row_nr }}_synth.wav" type="audio/x-wav"></audio></td>
    </tr>
{% endfor %}
</table>
    </tr>
